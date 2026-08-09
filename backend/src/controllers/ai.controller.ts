import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../utils/response.util';
import { AIService } from '../ai/services/ai.service';
import { ConversationModel } from '../database/schemas/conversation.schema';
import { MessageModel } from '../database/schemas/message.schema';
import { LoggingService, LogDomain } from '../operations/logging/logger.service';

export class AIController {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  public chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?._id;
      if (!userId) {
        return sendError(res, 'ERR_UNAUTHORIZED', 'Authentication required', 401);
      }

      const { conversationId, message } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return sendError(res, 'ERR_BAD_REQUEST', 'Valid message is required', 400);
      }
      if (message.length > 5000) {
        return sendError(res, 'ERR_BAD_REQUEST', 'Message is too long', 400);
      }

      let conversation;
      if (conversationId) {
        conversation = await ConversationModel.findById(conversationId);
        if (!conversation) {
          return sendError(res, 'ERR_NOT_FOUND', 'Conversation not found', 404);
        }
        if (conversation.userId !== userId) {
          return sendError(res, 'ERR_FORBIDDEN', 'Access denied to this conversation', 403);
        }
      } else {
        conversation = await ConversationModel.create({
          userId,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
        });
      }

      // Fetch history
      const history = await MessageModel.find({ conversationId: conversation._id }).sort({ createdAt: 1 });

      // Save user message
      await MessageModel.create({
        conversationId: conversation._id,
        userId,
        role: 'user',
        content: message
      });

      LoggingService.info(LogDomain.AI, `AI Request started for user ${userId} in conversation ${conversation._id}`);
      
      const startTime = Date.now();
      
      // Call AI Service
      const aiResponse = await this.aiService.chat(userId, message, history.map(msg => ({ role: msg.role === 'assistant' ? 'AI' : 'user', message: msg.content })));

      // Save assistant message
      const assistantMessage = await MessageModel.create({
        conversationId: conversation._id,
        userId,
        role: 'assistant',
        content: aiResponse.message
      });
      
      const duration = Date.now() - startTime;
      LoggingService.info(LogDomain.AI, `AI Request completed for user ${userId} in ${duration}ms`);

      sendSuccess(res, {
        conversationId: conversation._id,
        message: {
          role: 'assistant',
          content: aiResponse.message
        }
      });
    } catch (error) {
      LoggingService.error(LogDomain.AI, 'AI Chat Error', { error });
      next(error);
    }
  };
}

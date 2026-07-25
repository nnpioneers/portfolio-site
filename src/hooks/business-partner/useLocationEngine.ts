export function useLocationEngine() {
  const buildLocationPromptProps = () => {
    return {
      type: 'locationPrompt'
    };
  };

  const buildLocationIntelligenceCardProps = (loc: string) => {
    return {
      type: 'locationIntelligence',
      location: loc,
      lat: '13.0827',
      lng: '80.2707',
      demandScore: '92%',
      opportunity: '88%'
    };
  };

  return { buildLocationPromptProps, buildLocationIntelligenceCardProps };
}

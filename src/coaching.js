// Deliberately explainable heuristics for product exploration; no biometric inference.
export function getCoaching(session) {
  const gap = Math.abs(session.left - session.right);
  if (gap >= 10) {
    const side = session.left < session.right ? 'left' : 'right';
    return { title:`Bring your ${side} turns into balance`, cue:`On your next run, focus on steady pressure through each ${side} turn.`, reason:`Simulated ${side} turns scored ${Math.min(session.left,session.right)} versus ${Math.max(session.left,session.right)} on the other side.`, priority:'One focus for your next run' };
  }
  if (session.balance < 75) return {title:'Find a centered stance',cue:'On your next run, try to stay centered as the pitch changes.',reason:`Simulated balance score: ${session.balance}/100.`,priority:'One focus for your next run'};
  return {title:'Keep the rhythm going',cue:'On your next run, aim for the same steady timing from top to bottom.',reason:`Simulated rhythm score: ${session.rhythm}/100.`,priority:'One focus for your next run'};
}

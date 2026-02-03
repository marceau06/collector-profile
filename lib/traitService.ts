import traitsList from '../ressources/traits.json'
// Récupère tous les traits possibles depuis le fichier JSON
export async function fetchAllTraits(): Promise<Record<string, string[]>> {
  try {
    return traitsList;
  } catch (error) {
    console.error('Failed to load traits:', error);
    return {};
  }
}   
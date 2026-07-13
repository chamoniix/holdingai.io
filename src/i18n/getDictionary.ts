import 'server-only'

import en from './dictionaries/en.json'
import fr from './dictionaries/fr.json'
import de from './dictionaries/de.json'
import es from './dictionaries/es.json'
import it from './dictionaries/it.json'
import pt from './dictionaries/pt.json'

const dictionaries = { en, fr, de, es, it, pt }

export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.en
}

import Link from "next/link";
import { languages } from "../i18n/settings";

export const LanguageSwitcher = ({ lng } : { lng: string}) => {
  return (
    <>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l} >
            {index > 0 && (' or ')}
            <Link href={`/${l}`} className="px-4 py-2 border border-blue-600 rounded text-blue-600">
              {l}
            </Link>
          </span>
        )
      })}
    </>
  )
}
'use client'

import { useActionState } from 'react'
import { submitContact, type ContactFormState } from '@/app/actions'

const services = [
  'Stomatologie Generală',
  'Implant Dentar',
  'Ortodonție',
  'Albire Dentară',
  'Estetică Dentară',
  'Pedodonție',
  'Chirurgie Orală',
  'Parodontologie',
  'Altele',
]

export default function ContactForm() {
  const [state, action, isPending] = useActionState<ContactFormState | null, FormData>(
    submitContact,
    null,
  )

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-8 h-8 text-green-600"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Mesaj trimis cu succes!
        </h3>
        <p className="text-slate-600">
          Vă mulțumim pentru mesaj. Vă vom contacta în cel mai scurt timp.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      {state?.error && !state.fieldErrors && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
            Nume complet <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ion Popescu"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
          />
          {state?.fieldErrors?.name && (
            <p className="text-red-500 text-xs mt-1">{state.fieldErrors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="exemplu@email.com"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
          />
          {state?.fieldErrors?.email && (
            <p className="text-red-500 text-xs mt-1">{state.fieldErrors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+373 xx xxx xxx"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1.5">
            Serviciu dorit
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-white"
          >
            <option value="">Selectează un serviciu</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
          Mesaj <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Descrie pe scurt motivul contactului sau întrebările tale..."
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all resize-none"
        />
        {state?.fieldErrors?.message && (
          <p className="text-red-500 text-xs mt-1">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-sm flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Se trimite...
          </>
        ) : (
          <>
            Trimite mesajul
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Prin trimiterea acestui formular, ești de acord cu{' '}
        <a href="#" className="underline hover:text-blue-600">
          politica noastră de confidențialitate
        </a>
        .
      </p>
    </form>
  )
}

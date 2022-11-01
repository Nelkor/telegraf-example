import { Telegraf, Scenes, Context } from 'telegraf'
import {
  SceneSessionData,
  // import from index.d.ts instead of index.ts
  // eslint-disable-next-line import/no-unresolved
} from 'telegraf/typings/scenes'

export type Language = 'en' | 'ru'

interface SessionContext extends Context {
  session: {
    lang: Language
    lastMessageTime: number
    lastDelayWarningTime: number
  }
}

export type BotContext = Scenes.SceneContext & SessionContext

export type Bot = Telegraf<BotContext>

interface SceneSession<T extends object> extends SceneSessionData {
  state: T
}

export type SessionData<T extends object = never> = SessionContext &
  Scenes.SceneContext<SceneSession<T>>

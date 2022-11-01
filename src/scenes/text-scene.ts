import { Scenes, Markup } from 'telegraf'

import { SUM_SCENE_NAME, TEXT_SCENE_NAME } from '@/general'
import { SessionData } from '@/types'

type TextSceneData = SessionData<{ text: string }>

export const textScene = new Scenes.BaseScene<TextSceneData>(TEXT_SCENE_NAME)

textScene.enter(ctx => {
  ctx.reply('Сцена началась! Введи какой-нибудь текст').then()
})

textScene.command('stop', ctx => {
  ctx.scene.enter(SUM_SCENE_NAME)
})

textScene.on('text', ctx => {
  const { state } = ctx.scene.session

  if (state.text) {
    ctx.reply('Напиши /stop, чтобы закончить сцену')

    return
  }

  state.text = ctx.message.text

  ctx.reply(
    'Выбери что-нибудь',
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Заглавные', 'cb-text-1'),
        Markup.button.callback('Строчные', 'cb-text-2'),
      ],
    ])
  )
})

textScene.action(/^cb-text-(\d+)$/, ctx => {
  const actionType = parseInt(ctx.match[1])
  const { text } = ctx.scene.session.state
  const answer = actionType === 1 ? text.toUpperCase() : text.toLowerCase()

  ctx.answerCbQuery()
  ctx.reply(answer)
})

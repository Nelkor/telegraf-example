import { Scenes } from 'telegraf'

import { SUM_SCENE_NAME, TEXT_SCENE_NAME } from '@/general'
import { SessionData } from '@/types'

type SumSceneData = SessionData<{ numbers: number[] }>

export const sumScene = new Scenes.BaseScene<SumSceneData>(SUM_SCENE_NAME)

sumScene.enter(ctx => {
  ctx.scene.session.state.numbers = []

  ctx
    .reply(
      [
        'Вводи целые числа от 1 до 100. Максимум ты можешь ввести 10 чисел.',
        'Чтобы прекратить вводить числа, введи 0.',
        'Я сообщу тебе сумму этих чисел',
      ].join(' ')
    )
    .then()
})

sumScene.on('text', async ctx => {
  const { text } = ctx.message
  const number = parseInt(text)
  const isValid = text === number.toString() && number >= 0 && number <= 100

  if (!isValid) {
    ctx.reply(
      [
        'Это не подходит. Введи целое число от 1 до 100.',
        'Либо введи 0, чтобы закончить',
      ].join(' ')
    )

    return
  }

  const { numbers } = ctx.scene.session.state

  if (number) {
    numbers.push(number)
  }

  if (numbers.length >= 10 || !number) {
    if (!numbers.length) {
      await ctx.reply('Ты ничего не ввёл').then()
    } else {
      const result = numbers.reduce((acc, cur) => acc + cur)

      await ctx.reply(`Сумма чисел "${numbers.join(', ')}" = ${result}`).then()
    }

    ctx.scene.enter(TEXT_SCENE_NAME)

    return
  }

  ctx.reply(`Принял ${number}`)
})

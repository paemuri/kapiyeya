/*
 * Moon phase widget
 * © wDisseny — https://www.icalendar37.net/
 */
/* global XMLHttpRequest, moon_widget_loaded */
/* eslint-disable camelcase */
(() => {
  const container = document.getElementById('contain_moon')
  if (!container) return

  const parts = container.querySelectorAll('div')
  if (parts.length < 4) return

  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const url =
    `https://www.icalendar37.net/lunar/api/?lang=en&month=${month}&year=${year}` +
    '&size=100&lightColor=rgb(201, 105, 132)&shadeColor=rgb(17,17,17)' +
    `&LDZ=${new Date(year, month - 1, 1) / 1000}`

  parts[1].style.height = '100px'

  const request = new XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState !== 4 || request.status !== 200) return

    const data = JSON.parse(request.responseText)
    parts[1].innerHTML = data.phase[day].svg
    if (typeof moon_widget_loaded === 'function') moon_widget_loaded(data)
    parts[2].innerHTML = data.phase[day].npWidget
    parts[3].innerHTML = `Next full moon<br>${data.nextFullMoon}`
  }
  request.open('GET', url, true)
  request.send()
})()

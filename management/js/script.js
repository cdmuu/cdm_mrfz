const wrapper = document.querySelector('.wrapper')
const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.wrapper i')
const firstCardWidth = carousel.querySelector('.card').offsetWidth

const carouselChildrens = [...carousel.children]


let isDragging = false, startX, startScrollLeft, timeoutId

let cardPreView = Math.round(carousel.offsetWidth / firstCardWidth)

arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
      carousel.scrollLeft += btn.id === 'left' ? - firstCardWidth : firstCardWidth
  })
})

carouselChildrens.slice(-cardPreView).reverse().forEach(card => {
  carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})

carouselChildrens.slice(0, cardPreView).forEach(card => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

const dragStart = (e) => {
  isDragging = true
  carousel.classList.add('dragging')
  startX = e.pageX
  startScrollLeft = carousel.scrollLeft
}

const dargging = (e) => {
  if (!isDragging) return
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
  isDragging = false
  carousel.classList.remove('dragging')
}

const autoPlay = () => {
  if(window.innerWidth < 800) return
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
}
autoPlay()
const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft =  carousel.scrollWidth - (2 * carousel.offsetWidth)
    carousel.classList.remove('no-transition')
  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft =  carousel.scrollWidth
    carousel.classList.remove('no-transition')
  }
  clearTimeout(timeoutId)
  if (!wrapper.matches(':hover')) autoPlay()
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dargging)
document.addEventListener('mouseup', dragStop)
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId))
wrapper.addEventListener('mouseleave', autoPlay)

carousel.addEventListener('scroll', infiniteScroll)
//Loader
const loader = document.querySelector('.loader')
window.addEventListener('load', ()=>{
    loader.classList.remove('active')
})

//Add class active each item
const list = document.querySelectorAll('.aside-menu__options ul li')
list.forEach(item=>{
    item.addEventListener('click', ()=>{
        removeClass()
        item.classList.add('active')
    })
})

const removeClass=()=>{
    list.forEach(item => item.classList.remove('active'))
}

const toggleClass=(item)=>{
    item.addEventListener('click', ()=>{
        item.classList.toggle('liked')
        if (item.classList.contains('liked')) {
            item.setAttribute('name', 'heart')
            item.style.color = 'red'
        }else{
            item.setAttribute('name', 'heart-outline')
            item.style.color = 'var(--color-content-negro)'
        }
    })
}

//Like in each post
const everyLike = document.querySelectorAll('.like')
everyLike.forEach(item => {
    toggleClass(item)
})


//Add publication
const btnComment = document.getElementById('comment')
const comment = document.querySelector('#comment-publication')
const publication = document.querySelector('.comment-item')
const publication__item = document.querySelectorAll('.publication__item')

let arrayComments = []

btnComment.addEventListener('click', (e)=>{
    e.preventDefault()
    if (comment.value != '') {
        const text = comment.value
        const today = new Date();
        const hora = today.toLocaleDateString()
        const commentItem = {
            hora,
            text
        }
        arrayComments.unshift(commentItem)
        showData(arrayComments)
        localStorage.setItem('commentItem', JSON.stringify(arrayComments))
    }else{
        return
    }
})

const deleteElement=(array, item, i)=>{
    item.addEventListener('click', ()=>{
        array.splice(i,1)
        showData(array)
        localStorage.setItem('commentItem', JSON.stringify(array))
    })
}

const showData=(array)=>{
    publication.innerHTML = ''
    array.forEach((item,i)=>{
        const article = document.createElement('article')
        article.classList.add('publication__item')

        article.innerHTML = `
                <div class="publication__title">
                    <div class="img-content">
                        <img src="recursos/Stanley.png" alt="">
                    </div>
                    <div class="status">
                        <h2>Cafesito</h2>
                        <h4>Perú, ${item.hora}</h4>
                    </div>
                </div>
                <div class="publication__comment" style="margin-bottom: 10px">
                    ${item.text}
                </div>
                <div class="publication__icons" style="margin-bottom: 0">
                    <ion-icon class="like" name="heart-outline"></ion-icon>
                    <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                    <ion-icon name="share-social-outline"></ion-icon>
                    <ion-icon id="delete" name="trash-outline"></ion-icon>
                </div>
        `
        publication.append(article)
        publication.style = 'margin-top: 15px;'
        comment.value = ''
        const like__item = article.querySelector('.like')
        const deleteItem = article.querySelector('#delete')
        toggleClass(like__item)
        deleteElement(array,deleteItem, i)
    })
}

const commentsArray = JSON.parse(localStorage.getItem('commentItem'))
if (commentsArray.length != 0) {
    arrayComments = [...commentsArray]
    showData(commentsArray)
}else{
    false
}


//Storys
const storys = document.querySelectorAll('.swiper-slide img')
const modalStory = document.querySelector('.story')
const modalImg = document.querySelector('.story img')
const closeModal = document.querySelector('#close-modal-story')

storys.forEach(img => {
    const padreStory = img.parentElement
    padreStory.addEventListener('click', ()=>{
        modalStory.classList.add('show')
        modalImg.setAttribute('src', img.src)
    })
})

closeModal.addEventListener('click', ()=>{
    modalStory.classList.remove('show')
})

//Custom color: 
const setting = document.querySelector('#config')
const close_modal_setting = document.querySelector('#close-modal-color')
const modal__color = document.querySelector('.theme')

setting.addEventListener('click', ()=>{
    modal__color.classList.add('show')
})

close_modal_setting.addEventListener('click', ()=>{
    modal__color.classList.remove('show')
})

const theme = document.querySelector(':root')
const colorItem = document.querySelectorAll('.select-color div')

colorItem.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
        removeClassActive()
        const color = e.target.classList
        if (color.contains('celeste')) {
            theme.style.setProperty('--color-content-color', '#53bfe0')
        }else if(color.contains('amarillo')){
            theme.style.setProperty('--color-content-color', '#E9DC16')
        }else if(color.contains('verde')){
            theme.style.setProperty('--color-content-color', '#7DDA2A')
        }else if(color.contains('rojo')){
            theme.style.setProperty('--color-content-color', '#FB0B0B')
        }else if(color.contains('morado')){
            theme.style.setProperty('--color-content-color', '#9A44FB')
        }
        btn.classList.add('active')
    })
})

const removeClassActive=()=>{
    colorItem.forEach(item=> item.classList.remove('active'))
}

const bgColor = document.querySelectorAll('.select-bg div')

bgColor.forEach(item=>{
    item.addEventListener('click', (e)=>{
        removeClassColor()
        item.classList.add('active')
        const bgClass = e.target.classList
        if (bgClass.contains('dia')) {
            theme.style.setProperty('--color-bg', '#E4EEF8');
            theme.style.setProperty('--color-content-custom', '#fff')
            theme.style.setProperty('--color-content-blanco', '#fff')
            theme.style.setProperty('--color-content-negro', '#000')
        }else if(bgClass.contains('oscuro')){
            theme.style.setProperty('--color-bg', '#171426')
            theme.style.setProperty('--color-content-custom', '#3A345B')
            theme.style.setProperty('--color-content-blanco', '#000')
            theme.style.setProperty('--color-content-negro', '#fff')
        }else if(bgClass.contains('noche')){
            theme.style.setProperty('--color-bg', '#000')
            theme.style.setProperty('--color-content-custom', '#1D1B2D')
            theme.style.setProperty('--color-content-blanco', '#000')
            theme.style.setProperty('--color-content-negro', '#fff')
        }
    })
})

const removeClassColor=()=>{
    bgColor.forEach(item=>item.classList.remove('active'))
}

//Filtro Messages
import {user} from './data.js';
const message_section = document.getElementById('messages-section')
const input_filtro = document.getElementById('input-filtro')

const filtroMessages=(array)=>{
    message_section.innerHTML = ''
    array.forEach(user =>{
        message_section.innerHTML += `
            <div class="msgUser">
                <div class="msgUser__img">
                    <img src="${user.img}" alt="">
                </div>
                <div class="msgUser__msg">
                    <h5>${user.name}</h5>
                    <span>${user.message}</span>
                </div>
            </div>
        `
    })
}

window.addEventListener('load', filtroMessages(user))

input_filtro.addEventListener('keyup', (key)=>{
    const value = key.target.value
    const list = Array.from(user)
    const newUsers = list.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
    filtroMessages(newUsers)
})

//Modal Message
const close_modal_messagse = document.querySelector('.aside .close-modal')
const content_aside_options = document.querySelector('.aside-options')
const messages = document.getElementById('messages-icon')
const aside_message = document.querySelector('.aside')

messages.addEventListener('click', ()=>{
    content_aside_options.classList.add('show')
    aside_message.classList.add('show')
})

close_modal_messagse.addEventListener('click', ()=>{
    content_aside_options.classList.remove('show')
    aside_message.classList.remove('show')
})


//Notification
import {notification} from './data.js'
const notificationContent = document.getElementById('notification')
notification.forEach(noti => {
    notificationContent.innerHTML += `
        <div class="notificacion-item">
            <div class="noti-img">
                <img src="${noti.img}" alt="">
            </div>
            <div class="noti-info">
                <p><strong>${noti.name}</strong> ${noti.info}</p>
            </div>
        </div>
    `
})

//Modal Notification
const notification_icon = document.getElementById('notification-icon')
const asideNotification = document.querySelector('.aside-notification')
const closeModalNotification = document.querySelector('#close-modal-notification')

notification_icon.addEventListener('click', ()=>{
    content_aside_options.classList.add('show')
    asideNotification.classList.add('show')
})

closeModalNotification.addEventListener('click', ()=>{
    content_aside_options.classList.remove('show')
    asideNotification.classList.remove('show')
})
let year = document.getElementById('year')
let url = document.getElementById('url')
let submit = document.getElementById('submit')
let date = new Date();
let newYear = date.getFullYear()
year.innerText = newYear

submit.addEventListener('click', () => {
    if (url.value == '') {
        alert('Please Enter a URL...')
    }
})
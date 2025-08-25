let year = document.getElementById('year')
let url = document.getElementById('url')
let submit = document.getElementById('submit')
let unValid = document.getElementById('valid')
let loading = document.getElementById('converting')
let main = document.getElementById('main')


let date = new Date();
let newYear = date.getFullYear()
year.innerText = newYear
function check(url) {
    try {
        let myUrl = new URL(url)
        return true 
    } catch {
        unValid.style.display = 'block' 
        return false
    }
}
submit.addEventListener('click', () => {
    if (check(url.value)) {
        loading.style.display = 'block'
        main.style.filter = 'blur(5px)'
    }
    if (url.value == '') {
        alert('Please Enter a URL...')
    }
})

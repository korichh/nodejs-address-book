(function () {
    const action = document.querySelector('.action')
    const inFileTypes = (fileInput) => {
        const fileTypes = fileInput.getAttribute('accept').split(',')
        const ext = `.${fileInput.files[0].name.split('.').pop().toLowerCase()}`
        if (!fileTypes.includes(ext)) return false
        return true
    }

    if (action) {
        action.addEventListener('click', (e) => {
            if (e.target.closest('[data-closeaction]') || !e.target.closest('.action-inner')) action.classList.remove('_active')
        })

        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-openaction]')) action.classList.add('_active')
        })

        action.addEventListener('click', (e) => {
            if (e.target.closest('.tab-nav button')) {
                const tab = e.target.closest('.tab')
                const curBtn = e.target.closest('.tab-nav button')
                const curCnt = tab.querySelector(`[data-id="${curBtn.getAttribute('data-for')}"]`)
                const tabBtns = tab.querySelectorAll('.tab-nav button')
                const tabCnts = tab.querySelectorAll('.tab-content')
                for (const btn of tabBtns) btn.classList.remove('_active')
                for (const cnt of tabCnts) cnt.classList.remove('_active')
                curBtn.classList.add('_active')
                curCnt.classList.add('_active')
            }
        })

        action.addEventListener('change', (e) => {
            const form = e.target.closest('form')
            if (form.classList.contains('create-form') || form.classList.contains('edit-form')) {
                if (form.avatar.files.length === 0) return
                else if (form.avatar.files[0].size > 0.5 * 1024 * 1024) return
                else if (!inFileTypes(form.avatar)) return (form.avatar.value = '')

                const image = form.avatar.files[0]
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.addEventListener('loadstart', () => {
                    action.classList.add('_loading')
                })
                reader.addEventListener('load', () => {
                    const img = document.createElement('img')
                    img.setAttribute('src', reader.result)
                    form.querySelector('.preview').append(img)
                })
                reader.addEventListener('loadend', () => {
                    form.querySelector('.input-file').classList.add('_active')
                    action.classList.remove('_loading')
                })
            }
        })

        action.addEventListener('reset', (e) => {
            const form = e.target.closest('form')
            if (form.classList.contains('create-form') || form.classList.contains('edit-form')) {
                e.preventDefault()
                form.querySelector('.input-file').classList.remove('_active')
                form.querySelector('.input-file input').value = ''
                const check = form.querySelector('.input-file input[type="checkbox"]')
                if (check) check.removeAttribute('checked')
                form.querySelector('.preview > img').remove()
            }
        })
    }
})()
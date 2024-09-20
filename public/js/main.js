(function () {
    const action = document.querySelector('.action')
    const users = document.querySelector('.users')
    let searchTimeout
    const updateSearch = (s) => {
        if (s) window.history.pushState('', '', `${window.location.origin}${window.location.pathname}?s=${s}`)
        else window.history.pushState('', '', `${window.location.origin}${window.location.pathname}`)
    }
    const ui = {
        message: document.querySelector('.message'),
        confirm: function (mess) {
            if (!this.message) return false
            this.message.querySelector('.confirm p').textContent = mess
            this.message.classList.add('_active', '_confirm')
            return new Promise((resolve, reject) => {
                this.message.addEventListener('click', (e) => {
                    if (e.target.closest('[data-action="confirm"]')) {
                        resolve(true)
                        this.message.classList.remove('_active', '_confirm')
                    } else if (e.target.closest('[data-action="cancel"]')) {
                        resolve(false)
                        this.message.classList.remove('_active', '_confirm')
                    }
                })
            })
        },
        alert: function (mess, state) {
            if (!this.message) return false
            this.message.querySelector('.alert p').textContent = mess
            this.message.classList.add('_active', '_alert', state)
            return new Promise((resolve, reject) => {
                this.message.addEventListener('click', (e) => {
                    if (e.target.closest('[data-action="confirm"]')) {
                        resolve(true)
                        this.message.classList.remove('_active', '_alert', state)
                    }
                })
            })
        },
        destroy: function (uiPart) {
            switch (uiPart) {
                case 'message':
                    this.message.classList.remove('_active', '_alert', '_confirm', '_error', '_success')
                    break
            }
        }
    }

    if (action && users) {
        const actionInner = action.querySelector('.action-inner')
        const btnSearch = document.querySelector('[data-search]')
        const btnCreate = document.querySelector('[data-create]')

        btnSearch.addEventListener('click', async (e) => {
            try {
                btnSearch.setAttribute('disabled', 'true')
                action.classList.add('_loading')
                users.classList.add('_loading')

                const s = new URLSearchParams(window.location.search).get('s') || '';
                const response = await fetch(`/api/action/search?s=${s}`, { method: 'GET' })
                const data = await response.json()

                setTimeout(() => {
                    if (response.ok) actionInner.innerHTML = data.actionHTML
                    btnSearch.removeAttribute('disabled')
                    action.classList.remove('_loading')
                    users.classList.remove('_loading')
                }, 200);

                if (!response.ok) throw data.error
            } catch (err) {
                console.error(err)
            }
        })

        btnCreate.addEventListener('click', async (e) => {
            try {
                btnCreate.setAttribute('disabled', 'true')
                action.classList.add('_loading')
                users.classList.add('_loading')

                const response = await fetch(`/api/action/create`, { method: 'GET' })
                const data = await response.json()

                setTimeout(() => {
                    if (response.ok) actionInner.innerHTML = data.actionHTML
                    btnCreate.removeAttribute('disabled')
                    action.classList.remove('_loading')
                    users.classList.remove('_loading')
                }, 200);

                if (!response.ok) throw data.error
            } catch (err) {
                console.error(err)
            }
        })

        users.addEventListener('click', async (e) => {
            if (e.target.closest('.users-item')) {
                try {
                    action.classList.add('_loading')
                    users.classList.add('_loading')

                    const id = e.target.closest('.users-item').getAttribute('data-id')
                    const response = await fetch(`/api/action/get?id=${id}`, { method: 'GET' })
                    const data = await response.json()

                    setTimeout(() => {
                        if (response.ok) actionInner.innerHTML = data.actionHTML
                        action.classList.remove('_loading')
                        users.classList.remove('_loading')
                    }, 200);

                    if (!response.ok) throw data.error
                } catch (err) {
                    console.error(err)
                }
            }
        })

        action.addEventListener('click', async (e) => {
            if (e.target.closest('.action-btn.close')) actionInner.innerHTML = ''
            else if (e.target.closest('.action-btn.edit')) {
                try {
                    action.classList.add('_loading')
                    users.classList.add('_loading')

                    const id = action.querySelector('.user-box').getAttribute('data-id')
                    const response = await fetch(`/api/action/edit?id=${id}`, { method: 'GET' })
                    const data = await response.json()

                    setTimeout(() => {
                        if (response.ok) actionInner.innerHTML = data.actionHTML
                        action.classList.remove('_loading')
                        users.classList.remove('_loading')
                    }, 200);

                    if (!response.ok) throw data.error
                } catch (err) {
                    console.error(err)
                }
            } else if (e.target.closest('.user-delete')) {
                try {
                    if (!await ui.confirm('Are you sure?')) return
                    action.classList.add('_loading')
                    users.classList.add('_loading')

                    const id = action.querySelector('.user-box').getAttribute('data-id')
                    const response = await fetch(`/api/user/delete?id=${id}`, { method: 'DELETE' })
                    const data = await response.json()

                    setTimeout(() => {
                        if (response.ok) {
                            actionInner.innerHTML = ''
                            users.innerHTML = data.usersHTML
                            ui.alert(data.message, '_success')
                        }
                        action.classList.remove('_loading')
                        users.classList.remove('_loading')
                    }, 200);

                    if (!response.ok) throw data.error
                } catch (err) {
                    console.error(err)
                }
            }
        })

        action.addEventListener('submit', async (e) => {
            if (e.target.closest('.search-form')) e.preventDefault()
            else if (e.target.closest('.create-form')) {
                try {
                    e.preventDefault()
                    action.classList.add('_loading')
                    users.classList.add('_loading')

                    const form = e.target.closest('.create-form')
                    const formData = new FormData(form)
                    const response = await fetch(`/api/user/create`, { method: 'POST', body: formData })
                    const data = await response.json()

                    setTimeout(() => {
                        if (response.ok) {
                            actionInner.innerHTML = ''
                            users.innerHTML = data.usersHTML
                            ui.alert(data.message, '_success')
                        }
                        action.classList.remove('_loading')
                        users.classList.remove('_loading')
                    }, 200)

                    if (!response.ok) throw data.error
                } catch (err) {
                    console.error(err)
                }
            } else if (e.target.closest('.edit-form')) {
                try {
                    e.preventDefault()
                    action.classList.add('_loading')
                    users.classList.add('_loading')

                    const form = e.target.closest('.edit-form')
                    const formData = new FormData(form);
                    const id = form.getAttribute('data-id')
                    const response = await fetch(`/api/user/edit?id=${id}`, { method: 'PUT', body: formData })
                    const data = await response.json()

                    setTimeout(() => {
                        if (response.ok) {
                            actionInner.innerHTML = ''
                            users.innerHTML = data.usersHTML
                            ui.alert(data.message, '_success')
                        }
                        action.classList.remove('_loading')
                        users.classList.remove('_loading')
                    }, 200);

                    if (!response.ok) throw data.error
                } catch (err) {
                    console.error(err)
                }
            }
        })

        action.addEventListener('input', async (e) => {
            if (e.target.closest('.search-form')) {
                try {
                    const form = e.target.closest('.search-form')
                    const search = form.querySelector('input#search')

                    if (searchTimeout) clearTimeout(searchTimeout)
                    searchTimeout = setTimeout(async () => {
                        search.setAttribute('disabled', 'true')
                        action.classList.add('_loading')
                        users.classList.add('_loading')

                        const s = search.value
                        const response = await fetch(`/api/user/get?s=${s}`, { method: 'GET' })
                        const data = await response.json()

                        setTimeout(() => {
                            if (response.ok) users.innerHTML = data.usersHTML
                            updateSearch(s)
                            search.removeAttribute('disabled')
                            search.focus()
                            action.classList.remove('_loading')
                            users.classList.remove('_loading')
                        }, 200);

                        if (!response.ok) throw data.error
                    }, 500)
                } catch (err) {
                    console.error(err)
                }
            }
        })
    }
})()
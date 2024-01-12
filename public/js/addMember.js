// form
// To create a TASK
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value
  
    try {
      await axios.post('/api/v1/tasks', { name })
      showTasks()
      taskInputDOM.value = ''
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = `success, task added`
      formAlertDOM.classList.add('text-success')
    } catch (error) {
      formAlertDOM.style.display = 'block'
      formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    }, 3000)
  })
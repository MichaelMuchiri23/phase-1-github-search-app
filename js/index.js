const form=document.querySelector('#github-form')
form.addEventListener('submit',searchGithub)

function searchGithub(event){
    event.preventDefault()
    const input=document.querySelector('#search')
    console.log(input.value)

    fetch(`https://api.github.com/search/users?q=${input.value}`,{
        method:'GET',
        headers:{
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        //console.log(data)
        const ul1=document.querySelector('#user-list')
        const items=data.items
        const li1=document.createElement('li')
        const li2=document.createElement('li')

        li1.innerText=items[0].login
        li2.innerText=items[0].html_url
        ul1.appendChild(li1)
        ul1.appendChild(li2)

        li1.addEventListener('click',()=>{
            fetch(`https://api.github.com/users/${input.value}/repos`,{
                method:'GET',
                headers:{
                    Accept: 'application/vnd.github.v3+json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                //console.log(data)
                const ul2=document.querySelector('#repos-list')
                data.forEach(element=>{
                    const li=document.createElement('li')
                    li.innerText=element.name
                    ul2.appendChild(li)
                    
                })
            })
        })
    })
}
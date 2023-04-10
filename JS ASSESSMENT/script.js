const table = document.getElementById('table');
const tableHead = [{ name: ' NAME' }, { description: 'DESCRIPTION' }, { status: 'STATUS' }, { rate: 'RATE' }, { balance: 'BALANCE' }, { deposit: 'DEPOSIT' },{ action: 'ACTION' }];

const tHead = table.createTHead();
const thRow = tHead.insertRow();
tableHead.forEach(element => {
    const td = thRow.insertCell();
    const value = Object.values(element)[0];
    td.appendChild(document.createTextNode(value));
    td.setAttribute('class','td')
    thRow.setAttribute('class','thRow')
});

const tBody = table.createTBody();

function createTableBody(data) {
    data.forEach(element => {
        const tr = tBody.insertRow();
        tableHead.forEach(header => {
            const td = tr.insertCell();
            if (header.action !== 'ACTION') {
                const key = Object.keys(header)[0];
                td.appendChild(document.createTextNode(element[key]));
                tr.setAttribute('class','tr')

            }
            else {
                const editBtn = document.createElement('button');
                editBtn.innerText = ""
                editBtn.onclick = () => {editData(element); hideSave();};
                td.appendChild(editBtn);
                editBtn.setAttribute('class','btnedit')
            

                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = ""
                deleteBtn.onclick = () => deleteData(element.id);
                td.appendChild(deleteBtn);
                deleteBtn.setAttribute('class','btndel')
                td.setAttribute('class','td')
            }
        })

    });
}


// GET method
async function getData() {
    let response;
    try {
        response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        createTableBody(data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    console.log(response);
}


// POST method
function addData() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const rate = document.getElementById('rate').value;
    const balance = document.getElementById('balance').value;
    const deposit = document.getElementById('deposit').value;

    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            status: status,
            rate: rate,
            balance: balance,
            deposit: deposit,
        })
    })
}


// DELETE method
function deleteData(id) {
    fetch(`http://localhost:3000/data/${id}`, {
        method: 'DELETE',
    });
}


// PUT method
const btn = document.getElementById('update');
function editData(element) {
    const id = element.id;
    document.getElementById('name').value = element.name;
    document.getElementById('description').value = element.description;
    document.getElementById('status').value = element.status;
    document.getElementById('rate').value = element.rate;
    document.getElementById('balance').value = element.balance;
    document.getElementById('deposit').value = element.deposit;

    btn.onclick = function updateData() {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const status = document.getElementById('status').value;
        const rate = document.getElementById('rate').value;
        const balance = document.getElementById('balance').value;
        const deposit = document.getElementById('deposit').value;

        fetch(`http://localhost:3000/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                description: description,
                status: status,
                rate: rate,
                balance: balance,
                deposit: deposit
            })
        })
    }    
}


//   add customer button
function showForm() {
    const form = document.getElementById('form');
    form.style.display = 'block';
  }

  
// save button
function check(){
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const rate = document.getElementById('rate').value;
    const balance = document.getElementById('balance').value;
    const deposit = document.getElementById('deposit').value;
    const submit = document.getElementById('save')

    if(name.trim() === "" || description.trim() === "" || status.trim() === "" || rate.trim() === "" || balance.trim() === "" || deposit.trim() === "")
    {
        submit.disabled = true;
    }else{
        submit.disabled = false;
    }
    
};

//   update button 
function hideSave(){
    const hide = document.getElementById('save');
    const show = document.getElementById('update');
    hide.style.display= 'none';
    show.style.display= 'block'
}


// filter dropdown 
const select = document.getElementById('select');

select.addEventListener('change', () => {
  const status = select.value;
  filterData(status);
});

function filterData(status) {
  const rows = table.rows;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowStatus = row.cells[2].textContent.toLowerCase();
    if (rowStatus === status.toLowerCase() || status === 'status') {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
}


//   NAME Regex
const nameInput = document.getElementById('name');
const nameError = document.getElementById('name-error');

nameInput.addEventListener('input', () => {
    const nameRegex = /^[a-zA-Z]{3,25}$/;

    if (!nameRegex.test(nameInput.value)) {
        nameError.style.display = 'block';
    } else {
        nameError.style.display = 'none';
    }

});

//   DESCRIPTION Regex
const descriptionInput = document.getElementById('description');
const descriptionError = document.getElementById('description-error');

descriptionInput.addEventListener('input', () => {
    const descriptionRegex = /^[a-zA-Z0-9._%+-\s]{3,150}$/;

    if (!descriptionRegex.test(descriptionInput.value)) {
        descriptionError.style.display = 'block';
    } else {
        descriptionError.style.display = 'none';
    }

});

//   RATE Regex
const rateInput = document.getElementById('rate');
const rateError = document.getElementById('rate-error');

rateInput.addEventListener('input', () => {
    const rateRegex = /^[$]{1}[0-9.]*$/;

    if (!rateRegex.test(rateInput.value)) {
        rateError.style.display = 'block';
    } else {
        rateError.style.display = 'none';
    }

});

//   BALANCE Regex
const balanceInput = document.getElementById('balance');
const balanceError = document.getElementById('balance-error');

balanceInput.addEventListener('input', () => {
    const balanceRegex = /^[$]{1}[0-9.]*$/;

    if (!balanceRegex.test(balanceInput.value)) {
        balanceError.style.display = 'block';
    } else {
        balanceError.style.display = 'none';
    }

});

//   DEPOSIT Regex
const depositInput = document.getElementById('deposit');
const depositError = document.getElementById('deposit-error');

depositInput.addEventListener('input', () => {
    const depositRegex = /^[$]{1}[0-9.]*$/;

    if (!depositRegex.test(depositInput.value)) {
        depositError.style.display = 'block';
    } else {
        depositError.style.display = 'none';
    }

});

window.onload(getData())
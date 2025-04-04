async function loadHTML(id, file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const data = await response.text();
    const div = document.getElementById(id);
    div.innerHTML = data;
}

async function loadJson(name) {
    const response = await fetch(`includes/${name}.json`);
    const data = await response.json();
    return data;
}

async function initializePage() {
    try {
        // await loadHTML('form', '/includes/form.html');
        showForm();
        const idData = await loadJson('user_ids');
        const paidData = await loadJson('paid');
        finishLoading(idData, paidData);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function showForm() {
    document.getElementById('loading').remove();
    document.getElementById('form').classList.remove('display-none');
}

function finishLoading(idData, paidData) {
    const submitBtn = document.getElementById('btn-submission');

    document.querySelectorAll('#form input').forEach(element => {
        element.value = '';
    })

    const inputId = document.getElementById('652218046');
    const inputName = document.getElementById('1439887165');
    const inputDepartment = document.getElementById('1462645903');
    const inputYear = document.getElementById('1607664707');
    const inputPaid = document.getElementById('511837988');
    const inputAmount = document.getElementById('810803947');
    const inputPrice = document.getElementById('1799872179');

    const spanDrawThreashold = document.getElementById('draw-threashold');
    const alertPaidUser = document.getElementById('paid-alert');

    inputId.addEventListener('input', function () {
        const id = inputId.value;

        if (id.length >= 3) {
            const year = parseInt(id.slice(1, 3)) + 104;
            inputYear.value = year;
        }
        else {
            inputYear.value = '';
        }

        inputPaid.value = checkIfPaid(spanDrawThreashold, alertPaidUser);

        const ninthChar = id.charAt(8);
        let checkedId;
        if (!/^[a-zA-Z]$/.test(ninthChar)) {
            checkedId = id.slice(0, 8);
        } else {
            checkedId = id.slice(0, 8) + ninthChar.toUpperCase();
        }
        inputId.value = checkedId;

        inputDepartment.value = idData.includes(id.toUpperCase()) ? '英語學系' : '';
    });

    inputName.addEventListener('input', function () {
        inputPaid.value = checkIfPaid(spanDrawThreashold, alertPaidUser);
    });

    inputAmount.addEventListener('input', function () {
        const amount = inputAmount.value;

        if (amount == 1) {
            inputPrice.value = 100;
        }
        else if (amount == 2) {
            inputPrice.value = 190;
        }
        else if (amount >= 3) {
            inputPrice.value = amount * 100 - 30;
        }
        else {
            inputPrice.value = '';
        }
    });

    function checkIfPaid(spanDrawThreashold, alertPaidUser) {
        const id = inputId.value;
        const name = inputName.value;

        let hadPaid = '無';
        let threashold = 2;

        if (id.length > 0 && name.length > 0) {
            if (paidData.includes(id)) {
                hadPaid = '有';
                threashold = 1;
            }
            else if (paidData.includes(name)) {
                hadPaid = '有';
                threashold = 1;
            }
        }

        spanDrawThreashold.textContent = threashold;
        alertPaidUser.classList.toggle('display-none', threashold == 2);

        return hadPaid;
    }
}

window.addEventListener('load', initializePage);

function siwtchRole(isStudent) {
    const inputId = document.getElementById('652218046');
    const inputDepartment = document.getElementById('1462645903');
    const inputYear = document.getElementById('1607664707');

    if (!isStudent) {
        inputId.setAttribute("minlength", "0");
        inputYear.setAttribute("min", "0");

        inputId.value = '非在校生';
        inputDepartment.value = '非在校生';
        inputYear.value = 0;
    }
    else {
        inputId.setAttribute("minlength", "9");
        inputYear.setAttribute("min", "110");

        inputId.value = '';
        inputDepartment.value = '';
        inputYear.value = '';
    }

    inputId.parentElement.classList.toggle('display-none', !isStudent);
    inputDepartment.parentElement.classList.toggle('display-none', !isStudent);
    inputYear.parentElement.classList.toggle('display-none', !isStudent);

    document.getElementById('para-id').parentElement.classList.toggle('display-none', !isStudent);
    document.getElementById('para-department').parentElement.classList.toggle('display-none', !isStudent);

    document.getElementById('switch-student').classList.toggle('btn-fill', isStudent);
    document.getElementById('switch-notStudent').classList.toggle('btn-fill', !isStudent);
}

function checkValidity() {
    const allInputs = document.querySelectorAll('#form input');
    let invalidInput = null;

    for (let element of allInputs) {
        element.value = element.value.trim();

        if (!element.checkValidity()) {
            invalidInput = element;
            break;
        }
    }

    if (invalidInput) {
        invalidInput.reportValidity();
    } else {
        openModal('submissionConfirmation');
    }
}
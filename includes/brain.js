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
    const inputId = document.getElementById('652218046');
    const inputName = document.getElementById('1439887165');
    const inputDepartment = document.getElementById('1462645903');
    const inputYear = document.getElementById('1607664707');
    const inputPaid = document.getElementById('511837988');
    const inputAmount = document.getElementById('810803947');
    const inputPrice = document.getElementById('1799872179');
    
    const spanDrawThreashold = document.getElementById('draw-threashold');
    const alertPaidUser = document.getElementById('paid-alert');
    const paraPaidUser = document.getElementById('paid-notice');

    inputId.addEventListener('input', function () {
        inputDepartment.value = idData.includes(inputId.value) ? '英語學系' : '';

        const id = inputId.value;

        if (id.length >= 3) {
            const year = parseInt(id.slice(1, 3)) + 104;
            inputYear.value = year;
        }
        else {
            inputYear.value = '';
        }

        inputPaid.value = checkIfPaid(spanDrawThreashold, alertPaidUser, paraPaidUser);
    });

    inputName.addEventListener('input', function () {
        inputPaid.value = checkIfPaid(spanDrawThreashold, alertPaidUser, paraPaidUser);
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

    function checkIfPaid(spanDrawThreashold, alertPaidUser, paraPaidUser) {
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
        paraPaidUser.classList.toggle('display-none', threashold == 2);

        return hadPaid;
    }
}

window.addEventListener('load', initializePage);
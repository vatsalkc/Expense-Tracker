document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm = document.getElementById("expense-form");
    const expenseNameinp = document.getElementById("expense-name");
    const expensenAmountinp = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    let totalAmount = calculateTotal();
    updateTotal()
    renderExpenses();

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name = expenseNameinp.value.trim();
        const amount = parseFloat(expensenAmountinp.value.trim());
        if(name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id: Date.now(),
                name:name,
                amount:amount,
            };
            expenses.push(newExpense);
            saveExpensesTOlocal()
            renderExpenses()
            updateTotal()
            expenseNameinp.value = "";
            expensenAmountinp.value = "";
        }
    });


    function renderExpenses(){
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name} - $${expense.amount} <button class="delete" data-id="${expense.id}">Delete</button>`;
            expenseList.appendChild(li);
        });
    }


    function calculateTotal(){
        return expenses.reduce((sum,expense)=> sum + expense.amount,0)
    }

    function saveExpensesTOlocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses))
    }

    function updateTotal(){
        let totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2)
    }

    

    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const expId = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter((expense) => expense.id !== expId);
            saveExpensesTOlocal()
            renderExpenses();
            updateTotal()
        }
    });

});
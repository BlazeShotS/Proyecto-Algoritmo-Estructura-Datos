let lista = [];

function addNumber() {
    const inputNumber = document.getElementById("inputNumber").value;

    if (inputNumber !== "") {
        lista.push(parseInt(inputNumber));
        const table = document.getElementById("inputTable");
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        cell1.innerHTML = inputNumber;

        document.getElementById("inputNumber").value = "";
    }
}

function btnOrdenarActionPerformed() {
    let n = lista.length;
    let numeros = [...lista];

    // Implementar el algoritmo de ordenación burbuja
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (numeros[j] > numeros[j + 1]) {
                let temp = numeros[j];
                numeros[j] = numeros[j + 1];
                numeros[j + 1] = temp;
            }
        }
    }

    // Actualizar la tabla con los números ordenados
    const sortedTable = document.getElementById("sortedTable");
    sortedTable.innerHTML = ""; // Limpiar la tabla antes de agregar los números ordenados

    for (let i = 0; i < n; i++) {
        let row = sortedTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = i;
        cell2.innerHTML = numeros[i];
    }
}
// Datos iniciales
const exchangeRates = {
    'USD': 359.46,
    'EUR': 395.27
};

// Intentar cargar el historial guardado o inicializar uno nuevo si no hay nada guardado
let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

// Función para convertir la moneda
function convertCurrency(amount, currency) {
    if (currency in exchangeRates) {
        const result = amount * exchangeRates[currency];
        const historyMessage = `Se ha pasado de ${amount} pesos a ${currency}`;
        addConversionToHistory(historyMessage);
        return result;
    } else {
        return null;
    }
}

// Función para agregar la conversión al historial
function addConversionToHistory(historyMessage) {
    conversionHistory.push(historyMessage);
    updateHistoryDisplay();
    
    // Guardar el historial de conversiones en localStorage
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
}

// Función para mostrar el historial de conversiones
function updateHistoryDisplay() {
    const historyElement = document.getElementById('historyList');
    historyElement.innerHTML = ''; // Limpiar el historial
    conversionHistory.forEach(message => {
        const listItem = document.createElement('li');
        listItem.textContent = message;
        historyElement.appendChild(listItem);
    });
}

// Event listener para el formulario de conversión
document.addEventListener('DOMContentLoaded', (event) => {
    // Cargar el historial de conversiones al iniciar la aplicación
    updateHistoryDisplay();
});

document.getElementById('currencyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amountInput').value);
    const currency = document.getElementById('currencySelect').value;
    const result = convertCurrency(amount, currency);

    if (result !== null) {
        document.getElementById('resultOutput').textContent = `El resultado de la conversión es: ${result}`;
    } else {
        alert('Moneda no soportada. Intente con otra moneda.');
    }
});

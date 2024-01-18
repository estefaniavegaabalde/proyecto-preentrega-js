let exchangeRates = {
    'USD': 819.23,
    'EUR': 891.03 
};

// URL de la API de ExchangeRate-API 
const apiUrl = 'https://open.er-api.com/v6/latest/123456';

// Intentar cargar el historial guardado o inicializar uno nuevo si no hay nada guardado
const conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

// Función para obtener tasas de cambio desde la API
async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        exchangeRates = data.rates;
        console.log('Tasas de cambio cargadas:', exchangeRates);
    } catch (error) {
        console.error('Error al obtener tasas de cambio:', error);
        // Puedes manejar el error como desees (puede mostrar un mensaje de error al usuario, por ejemplo)
    }
}

// Llamada a la función para cargar las tasas de cambio al iniciar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    await fetchExchangeRates();
    // Puedes utilizar 'exchangeRates' en tu aplicación
});
    // Función para convertir la moneda
    function convertCurrency(amount, currency) {
        if (currency in exchangeRates) {
            const result = amount * exchangeRates[currency];
            const historyMessage = `Se ha pasado de ${amount} pesos a ${currency}. Resultado: ${result} ${currency}`;
            addConversionToHistory(historyMessage);

            // Mostrar alerta con SweetAlert2 después de cargar
            loadSweetAlert(result, currency);

            return result;
        } else {
            throw new Error('Moneda no soportada. Intente con otra moneda.');
        }
    }

    // Función para cargar SweetAlert2 de forma asíncrona
    function loadSweetAlert(result, currency) {
        if (typeof Swal === 'undefined') {
            // SweetAlert2 no se ha cargado todavía, espera y vuelve a intentar
            setTimeout(() => loadSweetAlert(result, currency), 100);
        } else {
            // SweetAlert2 está disponible, muestra la alerta
            Swal.fire({
                icon: 'success',
                title: '¡Conversión exitosa!',
                text: `Ya está hecha tu conversión. Resultado: ${result} ${currency}`,
            });
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
    const historyElement = document.getElementById('historyList');

    function updateHistoryDisplay() {
        historyElement.innerHTML = ''; // Limpiar el historial
        conversionHistory.forEach(message => {
            const listItem = document.createElement('li');
            listItem.textContent = message;
            historyElement.appendChild(listItem);
        });
    }

    // Event listener para el formulario de conversión
    document.addEventListener('DOMContentLoaded', () => {
        // Cargar el historial de conversiones al iniciar la aplicación
        updateHistoryDisplay();
    });

    document.getElementById('currencyForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amountInput').value);
        const currency = document.getElementById('currencySelect').value;
        try {
            const result = convertCurrency(amount, currency);
            document.getElementById('resultOutput').textContent = `El resultado de la conversión es: ${result} ${currency}`;
        } catch (error) {
            alert(error.message);
        }
    });
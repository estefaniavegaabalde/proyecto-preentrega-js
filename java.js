const exchangeRates = {
    'USD': 359.46,
    'EUR': 395.27
    };

const supportedCurrencies = Object.keys(exchangeRates);
let conversionHistory = [];

function convertCurrency(amount, currency) {
    console.log(`Intentando convertir ${amount} a ${currency}`);
    if (currency in exchangeRates) {
        const result = amount * exchangeRates[currency];
        console.log(`Conversión exitosa: ${amount} a ${currency} = ${result}`);
        return result;
    } else {
        console.log(`Moneda no soportada: ${currency}`);
        return null; // En caso de moneda no soportada
    }
}

function isCurrencySupported(currency) {
    const isSupported = supportedCurrencies.includes(currency);
    console.log(`¿Moneda soportada? ${currency}: ${isSupported}`);
    return isSupported;
}

function addConversionToHistory(amount, currency, result) {
    conversionHistory.push({ amount, currency, result });
    console.log(`Historial actualizado: ${amount} ${currency} = ${result}`);
}

function displayConversionHistory() {
    console.log('Mostrando historial de conversiones:');
    conversionHistory.forEach((conversion, index) => {
        console.log(`${index + 1}: ${conversion.amount} convertido a ${conversion.currency} = ${conversion.result}`);
    });
}

function startConversion() {
    console.log('Bienvenido al Conversor de Moneda');

    let repeat = true;
    while (repeat) {
        const amount = prompt('Ingrese la cantidad a convertir con moneda inicial pesos: ');

        if (isNaN(amount) || amount <= 0) {
            console.log('Por favor, ingrese un número válido.');
            continue;
        }

        const currency = prompt('Ingrese la moneda (USD, EUR, etc.): ');
        if (!isCurrencySupported(currency)) {
            console.log('Moneda no soportada. Intente con otra moneda.');
            continue;
        }

        const result = convertCurrency(parseFloat(amount), currency);
        if (result !== null) {
            console.log(`El resultado de la conversión es: ${result}`);
            addConversionToHistory(amount, currency, result);
        } else {
            console.log('Moneda no soportada. Intente con otra moneda.');
        }

        repeat = confirm('¿Desea realizar otra conversión?');
        if (!repeat) {
            displayConversionHistory();
            console.log('Gracias por usar el Conversor de Moneda. ¡Hasta luego!');
        }
    }
}

startConversion();


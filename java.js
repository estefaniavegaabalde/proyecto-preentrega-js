const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function convertCurrency(amount, currency) {
    switch (currency) {
        case 'USD':
            return amount * 359,46; // Tasa de conversión ejemplo
        case 'EUR':
            return amount * 395,27;
        // Añadir más casos según sea necesario
        default:
            return null; // En caso de moneda no soportada
    }
}

function askQuestion(query) {
    return new Promise((resolve) => {
        readline.question(query, resolve);
    });
}

async function startConversion() {
    console.log('Bienvenido al Conversor de Moneda');

    let repeat = true;

    while (repeat) {
        const amount = await askQuestion('Ingrese la cantidad a convertir: ');

        if (isNaN(amount) || amount <= 0) {
            console.log('Por favor, ingrese un número válido.');
        } else {
            const currency = await askQuestion('Ingrese la moneda (USD, EUR, etc.): ');
            const result = convertCurrency(parseFloat(amount), currency);

            if (result === null) {
                console.log('Moneda no soportada. Intente con otra moneda.');
            } else {
                console.log(`El resultado de la conversión es: ${result}`);
            }
        }

        const answer = await askQuestion('¿Desea realizar otra conversión? (si/no): ');
        if (answer.toLowerCase() !== 'si') {
            repeat = false;
            console.log('Gracias por usar el Conversor de Moneda. ¡Hasta luego!');
        }
    }

    readline.close();
}

startConversion();

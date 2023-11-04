document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const sections = document.querySelectorAll('section');
    // LENGHT
    const lengthInput = document.getElementById('length-input');
    const fromLengthUnit = document.getElementById('from-length-unit');
    const toLengthUnit = document.getElementById('to-length-unit');
    const convertedLength = document.getElementById('converted-length');
    // MASS
    const massInput = document.getElementById('mass-input');
    const fromMassUnit = document.getElementById('from-mass-unit');
    const toMassUnit = document.getElementById('to-mass-unit');
    const convertedMass = document.getElementById('converted-mass');
    // TEMPERATURE
    const temperatureInput = document.getElementById('temperature-input');
    const fromTemperatureUnit = document.getElementById('from-temperature-unit');
    const toTemperatureUnit = document.getElementById('to-temperature-unit');
    const convertedTemperature = document.getElementById('converted-temperature');
    // SPEED
    const speedInput = document.getElementById('speed-input');
    const fromSpeedUnit = document.getElementById('from-speed-unit');
    const toSpeedUnit = document.getElementById('to-speed-unit');
    const convertedSpeed = document.getElementById('converted-speed');
    // VOLUME
    const volumeInput = document.getElementById('volume-input');
    const fromVolumeUnit = document.getElementById('from-volume-unit');
    const toVolumeUnit = document.getElementById('to-volume-unit');
    const convertedVolume = document.getElementById('converted-volume');
    // ENERGY
    const energyInput = document.getElementById('energy-input');
    const fromEnergyUnit = document.getElementById('from-energy-unit');
    const toEnergyUnit = document.getElementById('to-energy-unit');
    const convertedEnergy = document.getElementById('converted-energy');

    // Ascunde meniul când pagina se încarcă
    sidebar.style.left = '-250px';

    // Ascunde meniul când faceți clic în afara meniului
    document.addEventListener('click', function (event) {
        if (event.target !== menuButton && event.target !== sidebar && event.target.parentNode !== sidebar) {
            sidebar.style.left = '-250px';
        }
    });

    // Deschide/închide meniul când faceți clic pe butonul de meniu
    menuButton.addEventListener('click', function () {
        if (sidebar.style.left === '-250px') {
            sidebar.style.left = '0';
        } else {
            sidebar.style.left = '-250px';
        }
    });

    // Afișează secțiunea corespunzătoare atunci când faceți clic pe elementul din meniu
    const menuItems = document.querySelectorAll('#sidebar a');

    menuItems.forEach(function (item, index) {
        item.addEventListener('click', function (event) {
            event.preventDefault();

            // Ascunde toate secțiunile
            sections.forEach(function (section) {
                section.style.display = 'none';
            });

            // Afișează secțiunea corespunzătoare
            sections[index].style.display = 'block';

            // Încercați să defilați la secțiunea corespunzătoare
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
// LENGHT
    function convertLength() {
        const inputValue = parseFloat(lengthInput.value);
        const fromUnit = fromLengthUnit.value;
        const toUnit = toLengthUnit.value;

        const conversionFactors = {
            'mm': 10,   // 1 cm = 10 mm
            'cm': 1,    // 1 cm = 1 cm
            'm': 0.01,  // 1 m = 100 cm
            'km': 0.00001  // 1 km = 1000 m
        };

        if (fromUnit in conversionFactors && toUnit in conversionFactors) {
            const result = inputValue * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
            convertedLength.textContent = result.toString();
        } else {
            convertedLength.textContent = "Unități neacceptate";
        }
    }
// MASS
    const conversionFactorsMass = {
        'g': 1,        // 1 g = 1 g
        'kg': 0.001,   // 1 kg = 1000 g
        'mg': 1000     // 1 mg = 0.001 g
    };

    function convertMass() {
        const inputValue = parseFloat(massInput.value);
        const fromUnit = fromMassUnit.value;
        const toUnit = toMassUnit.value;
    
        if (fromUnit in conversionFactorsMass && toUnit in conversionFactorsMass) {
            const result = inputValue * (conversionFactorsMass[toUnit] / conversionFactorsMass[fromUnit]);
            convertedMass.textContent = result.toString();
        } else {
            convertedMass.textContent = "Unități neacceptate";
        }
    }
// TEMPERATURE
const conversionFactorsTemperature = {
    'celsius': {
        'celsius': 1,
        'fahrenheit': (celsius) => (celsius * 9/5) + 32,
        'kelvin': (celsius) => celsius + 273.15
    },
    'fahrenheit': {
        'celsius': (fahrenheit) => (fahrenheit - 32) * 5/9,
        'fahrenheit': 1,
        'kelvin': (fahrenheit) => (fahrenheit - 32) * 5/9 + 273.15
    },
    'kelvin': {
        'celsius': (kelvin) => kelvin - 273.15,
        'fahrenheit': (kelvin) => (kelvin - 273.15) * 9/5 + 32,
        'kelvin': 1
    }
};

function convertTemperature() {
    const inputValue = parseFloat(temperatureInput.value);
    const fromUnit = fromTemperatureUnit.value;
    const toUnit = toTemperatureUnit.value;

    if (fromUnit in conversionFactorsTemperature && toUnit in conversionFactorsTemperature) {
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            convertedTemperature.textContent = conversionFactorsTemperature['celsius']['fahrenheit'](inputValue).toString() + " °F";
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            convertedTemperature.textContent = conversionFactorsTemperature['fahrenheit']['celsius'](inputValue).toString() + " °C";
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            convertedTemperature.textContent = conversionFactorsTemperature['kelvin']['celsius'](inputValue).toString() + " °C";
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            convertedTemperature.textContent = conversionFactorsTemperature['celsius']['kelvin'](inputValue).toString() + " K";
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            convertedTemperature.textContent = conversionFactorsTemperature['fahrenheit']['kelvin'](inputValue).toString() + " K";
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            convertedTemperature.textContent = conversionFactorsTemperature['kelvin']['fahrenheit'](inputValue).toString() + " °F";
        } else {
            const result = inputValue * conversionFactorsTemperature[fromUnit][toUnit];
            convertedTemperature.textContent = result.toString() + " " + toUnit;
        }
    } else {
        convertedTemperature.textContent = "Unități neacceptate";
    }
}

        
// SPEED
const conversionFactorsSpeed = {
    'kmh': {
        'kmh': 1,
        'ms': (kmh) => kmh * 1000 / 3600
    },
    'ms': {
        'kmh': (ms) => ms * 3600 / 1000,
        'ms': 1
    }
};

function convertSpeed() {
    const inputValue = parseFloat(speedInput.value);
    const fromUnit = fromSpeedUnit.value;
    const toUnit = toSpeedUnit.value;

    if (fromUnit in conversionFactorsSpeed && toUnit in conversionFactorsSpeed) {
        if (fromUnit === 'kmh' && toUnit === 'ms') {
            convertedSpeed.textContent = conversionFactorsSpeed['kmh']['ms'](inputValue).toString() + " m/s";
        } else if (fromUnit === 'ms' && toUnit === 'kmh') {
            convertedSpeed.textContent = conversionFactorsSpeed['ms']['kmh'](inputValue).toString() + " km/h";
        } else {
            const result = inputValue * conversionFactorsSpeed[fromUnit][toUnit];
            convertedSpeed.textContent = result.toString() + " " + toUnit;
        }
    } else {
        convertedSpeed.textContent = "Unități neacceptate";
    }
}
// VOLUME
const conversionFactorsVolume = {
    'L': {
        'L': 1,
        'mL': (liters) => liters * 1000
    },
    'mL': {
        'L': (milliliters) => milliliters / 1000,
        'mL': 1
    }
};

function convertVolume() {
    const inputValue = parseFloat(volumeInput.value);
    const fromUnit = fromVolumeUnit.value;
    const toUnit = toVolumeUnit.value;

    if (fromUnit in conversionFactorsVolume && toUnit in conversionFactorsVolume) {
        if (fromUnit === 'L' && toUnit === 'mL') {
            convertedVolume.textContent = conversionFactorsVolume['L']['mL'](inputValue).toString() + " mL";
        } else if (fromUnit === 'mL' && toUnit === 'L') {
            convertedVolume.textContent = conversionFactorsVolume['mL']['L'](inputValue).toString() + " L";
        } else {
            const result = inputValue * conversionFactorsVolume[fromUnit][toUnit];
            convertedVolume.textContent = result.toString() + " " + toUnit;
        }
    } else {
        convertedVolume.textContent = "Unități neacceptate";
    }
}
// ENERGY
const conversionFactorsEnergy = {
    'J': {
        'J': 1,
        'kJ': (joules) => joules / 1000
    },
    'kJ': {
        'J': (kilojoules) => kilojoules * 1000,
        'kJ': 1
    }
};

function convertEnergy() {
    const inputValue = parseFloat(energyInput.value);
    const fromUnit = fromEnergyUnit.value;
    const toUnit = toEnergyUnit.value;

    if (fromUnit in conversionFactorsEnergy && toUnit in conversionFactorsEnergy) {
        if (fromUnit === 'J' && toUnit === 'kJ') {
            convertedEnergy.textContent = conversionFactorsEnergy['J']['kJ'](inputValue).toString() + " kJ";
        } else if (fromUnit === 'kJ' && toUnit === 'J') {
            convertedEnergy.textContent = conversionFactorsEnergy['kJ']['J'](inputValue).toString() + " J";
        } else {
            const result = inputValue * conversionFactorsEnergy[fromUnit][toUnit];
            convertedEnergy.textContent = result.toString() + " " + toUnit;
        }
    } else {
        convertedEnergy.textContent = "Unități neacceptate";
    }
}
    lengthInput.addEventListener('input', convertLength);
    fromLengthUnit.addEventListener('change', convertLength);
    toLengthUnit.addEventListener('change', convertLength);

    massInput.addEventListener('input', convertMass);
    fromMassUnit.addEventListener('change', convertMass);
    toMassUnit.addEventListener('change', convertMass);
    
    temperatureInput.addEventListener('input', convertTemperature);
    fromTemperatureUnit.addEventListener('change', convertTemperature);
    toTemperatureUnit.addEventListener('change', convertTemperature);


    speedInput.addEventListener('input', convertSpeed);
    fromSpeedUnit.addEventListener('change', convertSpeed);
    toSpeedUnit.addEventListener('change', convertSpeed);

    volumeInput.addEventListener('input', convertVolume);
    fromVolumeUnit.addEventListener('change', convertVolume);
    toVolumeUnit.addEventListener('change', convertVolume);

    energyInput.addEventListener('input', convertEnergy);
    fromEnergyUnit.addEventListener('change', convertEnergy);
    toEnergyUnit.addEventListener('change', convertEnergy);

});

const unitConversions = {
    length: {
      units: { meters: 1, kilometers: 0.001, miles: 0.000621371, feet: 3.28084 },
    },
    weight: {
      units: { grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274 },
    },
    temperature: {
      convert: (value, from, to) => {
        if (from === to) return value;
        if (from === "celsius" && to === "fahrenheit") return value * 9 / 5 + 32;
        if (from === "fahrenheit" && to === "celsius") return (value - 32) * 5 / 9;
        if (from === "celsius" && to === "kelvin") return value + 273.15;
        if (from === "kelvin" && to === "celsius") return value - 273.15;
        if (from === "fahrenheit" && to === "kelvin") return (value - 32) * 5 / 9 + 273.15;
        if (from === "kelvin" && to === "fahrenheit") return (value - 273.15) * 9 / 5 + 32;
      },
      units: { celsius: "Celsius", fahrenheit: "Fahrenheit", kelvin: "Kelvin" },
    },
  };
  
  document.getElementById("unitType").addEventListener("change", updateUnitOptions);
  document.getElementById("convertBtn").addEventListener("click", convertUnits);
  
  function updateUnitOptions() {
    const unitType = document.getElementById("unitType").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
  
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
  
    const units = unitConversions[unitType].units;
    for (const unit in units) {
      fromUnit.add(new Option(unit, unit));
      toUnit.add(new Option(unit, unit));
    }
  }
  
  function convertUnits() {
    const unitType = document.getElementById("unitType").value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
  
    if (isNaN(inputValue)) {
      alert("Please enter a valid number.");
      return;
    }
  
    let convertedValue;
    if (unitType === "temperature") {
      convertedValue = unitConversions[unitType].convert(inputValue, fromUnit, toUnit);
    } else {
      const fromRate = unitConversions[unitType].units[fromUnit];
      const toRate = unitConversions[unitType].units[toUnit];
      convertedValue = inputValue * (toRate / fromRate);
    }
  
    document.getElementById("resultValue").textContent = convertedValue.toFixed(4);
  }
  
  updateUnitOptions();
  
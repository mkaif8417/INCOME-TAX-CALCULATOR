document.getElementById("tax-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const income = parseFloat(document.getElementById("income").value);
    const country = document.getElementById("country").value;
    const resultDiv = document.getElementById("result");

    if (isNaN(income) || income <= 0 || country === "default") {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "<p>Please enter a valid income and select a country.</p>";
        return;
    }

    let tax = 0;
    let currencySymbol = '';

    if (country === "usd") {
        tax = calculateUSTax(income);
        currencySymbol = '$';
    } else if (country === "qatar") {
        tax = calculateQatarTax(income);
        currencySymbol = '﷼'; // Qatari Riyal symbol
    } else if (country === "saudi") {
        tax = calculateSaudiTax(income);
        currencySymbol = '﷼'; // Saudi Riyal symbol
    } else if (country === "uk") {
        tax = calculateUKTax(income);
        currencySymbol = '£'; // British Pound symbol
    } else if (country === "india") {
        tax = calculateIndiaTax(income);
        currencySymbol = '₹'; // Indian Rupee symbol
    }

    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<p>Your calculated tax is: ${currencySymbol}${tax.toFixed(2)}</p>`;
});

// US tax calculation based on income slabs
function calculateUSTax(income) {
    if (income <= 9875) {
        return income * 0.10;
    } else if (income <= 40125) {
        return 987.50 + (income - 9875) * 0.12;
    } else if (income <= 85525) {
        return 4617.50 + (income - 40125) * 0.22;
    } else if (income <= 163300) {
        return 14605.50 + (income - 85525) * 0.24;
    } else {
        return 33271.50 + (income - 163300) * 0.32;
    }
}

// Qatar tax calculation
function calculateQatarTax(income) {
    // Assuming Qatar has no personal income tax
    return 0; // No tax in Qatar for personal income
}

// Saudi Arabia tax calculation
function calculateSaudiTax(income) {
    // Saudi Arabia doesn't impose a personal income tax on its residents
    return 0; // No tax in Saudi for personal income
}

// UK tax calculation based on income slabs
function calculateUKTax(income) {
    if (income <= 12570) {
        return 0;
    } else if (income <= 50270) {
        return (income - 12570) * 0.20;
    } else if (income <= 150000) {
        return 7540 + (income - 50270) * 0.40;
    } else {
        return 47948 + (income - 150000) * 0.45;
    }
}

// India tax calculation based on income slabs
function calculateIndiaTax(income) {
    if (income <= 250000) {
        return 0;
    } else if (income <= 500000) {
        return (income - 250000) * 0.05;
    } else if (income <= 1000000) {
        return 12500 + (income - 500000) * 0.20;
    } else {
        return 112500 + (income - 1000000) * 0.30;
    }
}

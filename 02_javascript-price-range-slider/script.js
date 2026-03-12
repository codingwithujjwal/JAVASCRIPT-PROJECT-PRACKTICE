const rangeValue = document.querySelector(".slider .price-slider");
const rangeInputValue = document.querySelectorAll(".range-input input");


// set the price gap

let priceGap = 500;

// Adding event listeners to price input element

const priceInputValue = document.querySelectorAll(".price-input input");

for (let i = 0; i < priceInputValue.length; i++){
    priceInputValue[i].addEventListener("input", e => {
        
        let minP = parseInt(priceInputValue[0].value);
        let maxP = parseInt(priceInputValue[1].value)
        let diff= maxP-minP
    

        if (minP < 0) {
            alert("Minimum price can't be less than 0")
            priceInputValue[0].value = 0
            minP=0
        }

        // validate the input value

        if (maxP>10000) {
            alert("Max price can't be greater than 10000");
            priceInputValue[1].value = 10000;
            maxP=10000
        }

        if (minP>maxP-priceGap) {
            priceInputValue[0].value = maxP - priceGap;
            minP = maxP - priceGap;
            
            if (minP<0) {
                priceInputValue[0].value = 0
                minP=0
            }
        }


        //  check if the price gap met and max price is within the range

        if (diff >= priceGap && maxP <= rangeInputValue[1].max) {
            
            if (e.target.className === "min-input") {
                rangeInputValue[0].value = minP;
                let value1 = rangeInputValue[0].max
                rangeInputValue.style.left=`${(minP/value1)*100}%`
            }

            else {
                rangeInputValue[1].value = maxP;
                let value2 = rangeInputValue[1].max;
                rangeInputValue.style.right=`${100-(maxP/value2)*100}%`
            }

        }
    })
    
    // add event listeners to range input element

    for (let i = 0; i < rangeInputValue.length; i++){
        rangeInputValue[i].addEventListener("input", e => {
            let minVal = parseInt(rangeInputValue[0].value);
            let maxVal = parseInt(rangeInputValue[1].value);

            let diff = maxVal - minVal
            
            // check if the price gap is exceeded

            if (diff<priceGap) {
                // check the input is minimum range input

                if (e.target.className==="min-range") {
                    rangeInputValue[0] = maxVal - priceGap;
                }
                else {
                    rangeInputValue[1] = maxVal + priceGap;
                }
            }
            else {
                // update price input and range progress

                priceInputValue[0].value = minVal;
                priceInputValue[1].value = minVal;

                rangeInputValue.style.left = `${(minVal / priceInputValue[0].max) * 100}%`;

                rangeInputValue.style.right=`${100-(maxVal/priceInputValue[1].max)*100}%`
            }


        })
    }

}
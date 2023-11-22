// ELEMENT VARIABLES
const stepContainer1 = document.querySelector('.container__step1');
const stepContainer2 = document.querySelector('.container__step2');
const stepContainer3 = document.querySelector('.container__step3');
const stepContainer4 = document.querySelector('.container__step4');
const stepContainer5 = document.querySelector('.container__step5');
const stepContainer = [stepContainer1, stepContainer2, stepContainer3, stepContainer4];
const stepNumber1 = document.querySelector('.step_num1');
const stepNumber2 = document.querySelector('.step_num2');
const stepNumber3 = document.querySelector('.step_num3');
const stepNumber4 = document.querySelector('.step_num4');
const stepNumberContainer = [stepNumber1, stepNumber2, stepNumber3, stepNumber4];
const nextStepButtons = document.querySelectorAll('.button__nextStep');
const goBackButtons = document.querySelectorAll('.button__goBack');



const finalSubscriptionContainer = document.querySelector('.final__addons__container');
const allAddons = document.querySelectorAll('.container__addon');
const checkboxAll = document.querySelectorAll('.checkbox');



const totalPriceMY = document.querySelector('.option__MY');
const totalPrice = document.querySelector('.total__price');
const totalPriceContainer = document.querySelector('.total__price__container');

const buttonConfirm = document.querySelector('.button__confirm');


// NEXT STEP BUTTON FUNCTION
let currenStep = 0;

function nextStep() {
  stepContainer.forEach(step => step.classList.add('hidden'));
  currenStep ++;
  stepContainer[currenStep].classList.remove('hidden');
  stepNumberContainer.forEach(stepNum => stepNum.classList.remove('step__current'));
  stepNumberContainer[currenStep].classList.add('step__current')
}

// PREIVOUS STEP FUNCTION

function previousStep() {
  stepContainer.forEach(step => step.classList.add('hidden'));
  currenStep --;
  stepContainer[currenStep].classList.remove('hidden');
  stepNumberContainer.forEach(stepNum => stepNum.classList.remove('step__current'));
  stepNumberContainer[currenStep].classList.add('step__current')
}

goBackButtons.forEach( button => button.addEventListener('click', previousStep))

//STEP 1 
//Phone number validator
const nextStep1 = document.querySelector('.button__nextStep__step1');
const phoneNumberInput = document.querySelector('.input__phone');
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const containerStep1 = document.querySelector('.container__step1');
const textPhone = document.querySelector('.text__phone');

let errorMessage = null;



function validatePhoneNumber(phoneNumber) {
  if (phoneRegex.test(phoneNumberInput.value)) {
    // If the error message exists, remove it
    if (errorMessage) {
      errorMessage.remove();
      errorMessage = null;
    }
    nextStep();
  } else {
    phoneNumberInput.classList.add('inputError');
    // If the error message doesn't exist, create and append it
    if (!errorMessage) {
      errorMessage = document.createElement('span');
      errorMessage.style.color = 'red';
      errorMessage.style.textAlign = 'right';
      textPhone.style.display = "flex";
      textPhone.style.justifyContent = 'space-between';
      textPhone.append(errorMessage);
    }
    errorMessage.innerHTML = "Invalid phone number!";
  }
};

nextStep1.addEventListener('click', function() {
  validatePhoneNumber(phoneNumberInput.value)
})


//STEP 2
// Plan options choice
const planOptions = document.querySelectorAll('.planOption');

planOptions.forEach(planOption => planOption.addEventListener('click', function() {
  planOptions.forEach(option => option.classList.remove('selected'));
  this.classList.add('selected');
  const selectedPlan = this.innerHTML;
}))

//Monthly / Yearly slider 
const switchToggle = document.querySelector('.switch input');
const optionPriceArcade= document.querySelector('.optionPrice__arcade');
const optionPriceAdvanced= document.querySelector('.optionPrice__advanced');
const optionPricePro= document.querySelector('.optionPrice__pro');


const addonPriceOnlineServices = document.querySelector('.online__service');
const addonPriceLargerStorage = document.querySelector('.larger__storage');
const addonPriceCustomizableProfle = document.querySelector('.customizable__profile');

const nextStep2 = document.querySelector('.button__nextStep__step2');


switchToggle.addEventListener('change', function () {
  if (switchToggle.checked) {
    console.log('Switch is in Yearly position');
    optionPriceArcade.innerHTML = '$90/yr';
    optionPriceAdvanced.innerHTML = '$120/yr';
    optionPricePro.innerHTML = '$150/yr';

    addonPriceOnlineServices.innerHTML = '$10/yr';
    addonPriceLargerStorage.innerHTML = '$20/yr';
    addonPriceCustomizableProfle.innerHTML = '$20/yr';

  } else {
    console.log('Switch is in Monthly position');
    optionPriceArcade.innerHTML = '$9/mo';
    optionPriceAdvanced.innerHTML = '$12/mo';
    optionPricePro.innerHTML = '$15/mo';

    addonPriceOnlineServices.innerHTML = '$1/mo';
    addonPriceLargerStorage.innerHTML = '$2/mo';
    addonPriceCustomizableProfle.innerHTML = '$2/mo';
  }
});

nextStep2.addEventListener('click', nextStep);


//STEP 3
const addonOptions = document.querySelectorAll('.container__addon');
const nextStep3 = document.querySelector('.button__nextStep__step3');
const finalSubscriptionNameMY = document.querySelector('.final__subscription__name__MY');
const finalSubscriptionPrice = document.querySelector('.final__subscription__price');


checkboxAll.forEach(function(checkbox) {
  checkbox.checked = false;
});

addonOptions.forEach(addonOption => addonOption.classList.remove('selected'));


addonOptions.forEach(addonOption => addonOption.addEventListener('click', function() {
  // Toggle the 'selected' class for the clicked option
  this.classList.toggle('selected');

  // Toggle the checked state of the checkbox in the clicked option
  const checkbox = this.querySelector('.checkbox');
  checkbox.checked = !checkbox.checked;
}));

let addonFinalPrice = 0;
nextStep3.addEventListener('click', nextStep);
nextStep3.addEventListener('click', function() {
  for (let i = 0; i < addonOptions.length; i++){
    if (addonOptions[i].classList.contains('selected')){
      const addonPriceElement = addonOptions[i].querySelector('.addon__price');
      if (addonPriceElement) {
        currentAddonPrice =  Number(addonPriceElement.innerHTML.match(/\d+/));
      }
      addonFinalPrice +=currentAddonPrice;
      console.log(addonFinalPrice);
    }
  }
});


//STEP 3
//Function to gather data dynamically from previous steps



function gatherDynamicData() {
  //Plan 
  const finalSubscriptionName = document.querySelector('.final__subscription__name');
  const finalSubscriptionpPrice = document.querySelector('.final__subscription__price');

  const allPlanOptions = document.querySelectorAll('.planOption');
  for (let i = 0; i < allPlanOptions.length; i++) {
    if (allPlanOptions[i].classList.contains('selected')) {
      let optionType = allPlanOptions[i].querySelector('.optionType');
      if (optionType) {
        finalSubscriptionName.innerHTML = optionType.innerHTML
      }

      let optionPrice = allPlanOptions[i].querySelector('.optionPrice');
      if (optionPrice) {
        finalSubscriptionpPrice.innerHTML = optionPrice.innerHTML
      }


    }
  }

  //Yearly / monthly
  
  if (switchToggle.checked) {
    finalSubscriptionNameMY.innerHTML = "Yearly";
  } else {
    finalSubscriptionNameMY.innerHTML = "Monthly";
  }

  finalSubscriptionPrice.classList.add('finalSubscriptionPrice');
  
  //Addons
 

  for (let j = 0; j < allAddons.length; j++){
    if (allAddons[j].classList.contains('selected')){
      const newdiv = document.createElement('div');
      let addonName = allAddons[j].querySelector('.addon__name');
      const addonNameDiv = document.createElement('div');
      addonNameDiv.innerHTML = addonName.innerHTML;

      let addonPrice = allAddons[j].querySelector('.addon__price');
      const addonPriceDiv = document.createElement('div');
      addonPriceDiv.style.color = 'hsl(213, 96%, 18%)';
      addonPriceDiv.style.fontWeight = '400';
      addonPriceDiv.innerHTML = addonPrice.innerHTML;
      addonPriceDiv.classList.add('addonPrice')


        newdiv.append(addonNameDiv);
        newdiv.append(addonPriceDiv);
        newdiv.classList.add('finalAddons');
      
        finalSubscriptionContainer.append(newdiv);
    }
  }

    //Total price
   
    if (finalSubscriptionNameMY.innerHTML === 'Monthly'){
      totalPriceMY.innerHTML = 'month)'
    }
    else {
      totalPriceMY.innerHTML = 'year)'
    }

    const PerMonthPerYear = totalPriceMY.innerHTML === 'month)' ?  '/mo' : '/yr'

    totalPrice.innerHTML =`$ ${addonFinalPrice + Number(finalSubscriptionpPrice.innerHTML.match(/\d+/))} ${PerMonthPerYear}` ;
    
    totalPriceContainer.classList.add('finalPriceTotal')
    

}

//gathering dynamic info when clicking next in step 3 
nextStep3.addEventListener('click', gatherDynamicData);

const goBackStep4 = document.querySelector('.button__goBack___step4');

goBackStep4.addEventListener('click', function() {
  // Remove all children of finalSubscriptionContainer
  while (finalSubscriptionContainer.firstChild) {
    finalSubscriptionContainer.removeChild(finalSubscriptionContainer.firstChild);
  }

  // Reset the addonFinalPrice to 0
  addonFinalPrice = 0;

  // Reset the total price to 0
  totalPrice.innerHTML = '0';
});





buttonConfirm.addEventListener('click', function() {
  stepContainer4.classList.add('hidden');
  stepContainer5.classList.remove('hidden');
})
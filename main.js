var getIndex = function (el) {
  var arr = el.parentNode.children;
  for (var i = 0; i < arr.length; i++) {
    if (el === arr[i]) {
      return i;
    }
  }
  return -1;
};

var setSlider = function (slider) {
  var sliderContent = slider.getElementsByClassName("slider-main")[0];
  var sliderItems = slider.getElementsByClassName("slider-item");
  var sliderIndicators = slider.getElementsByClassName("indicators")[0];
  var i = null;
  var elIndex = null;
  var sliderIndicatorItems = null;

  var changeActive = function (oldItem, newItem) {
    sliderIndicatorItems[oldItem].classList.remove("active-item");
    sliderIndicatorItems[newItem].classList.add("active-item");
    if (sliderIndicators) {
      sliderItems[oldItem].classList.remove("active");
      sliderItems[newItem].classList.add("active");
    }
  };

  if (sliderIndicators) {
    for (i = 0; i < sliderItems.length - 2; i++) {
      var elementLi = document.createElement("li");
      elementLi.className = "item fa-solid fa-circle";
      sliderIndicators.appendChild(elementLi);
    }

    elIndex = getIndex(sliderContent.getElementsByClassName("active")[0]);
    sliderIndicatorItems = sliderIndicators.getElementsByClassName("item");
    sliderIndicatorItems[elIndex].classList.add("active-item");
    for (i = 0; i < sliderIndicatorItems.length; i++) {
      sliderIndicatorItems[i].addEventListener("click", function () {
        changeActive(
          getIndex(slider.getElementsByClassName("active-item")[0]),
          getIndex(this)
        );
      });
    }
  }
};

window.addEventListener("load", function () {
  setSlider(document.getElementsByClassName("slider-container")[0]);
});

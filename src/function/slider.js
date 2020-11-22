export function slider(){
    const imgAll = (res) => document.querySelectorAll(res);
    const wraps = imgAll(".pictures");

    wraps.forEach((wrap) => {
      const slide = wrap.children[1]; // slide
      slide.style.cssText = "overflow:hidden; position:relative;";
      const target = slide.children[0]; // ul
      const len = target.children.length; // li size
      const button = wrap.children[0]; // left, right button
      if (len > 1) {
        const leftbutton = button.children[0];
        const rightbutton = button.children[1];
        button.style.cssText =
          "position:absolute; width:100%; display:flex; justify-content:space-between; top:50%; transform:translateY(-50%); z-index:10;";
        leftbutton.style.cssText =
          "cursor:pointer; position:absolute; left:1rem; height:1.5rem; width:1.5rem; font-size:1.25rem;";
        rightbutton.style.cssText =
          "position:absolute; text-align:right; height:1.5rem; width:1.5rem; font-size:1.25rem; right:1rem; cursor:pointer;";
        leftbutton.children[0].style.cssText =
          "border-radius:0.75rem; transform:translateY(-10%); background-color:transparent; color:lightgrey; border:1.25px solid lightgrey;";
        rightbutton.children[0].style.cssText =
          "border-radius:0.75rem; transform:translateY(-10%); background-color:transparent; color:lightgrey; border:1.25px solid lightgrey;";
        let pos = 0;
        leftbutton.style.display = "none";
        leftbutton.addEventListener("click", () => {
          if (pos > 0) {
            pos = pos - 1;
            if (pos == 0) leftbutton.style.display = "none";
            rightbutton.style.display = "inline";
          }
          target.style.marginLeft = `${-pos * 100}%`;
        });

        rightbutton.addEventListener("click", () => {
          if (pos < len - 1) {
            pos = pos + 1;
            if (pos == len - 1) rightbutton.style.display = "none";
            leftbutton.style.display = "inline";
          }
          target.style.marginLeft = `${-pos * 100}%`;
        });

        target.style.cssText = `width:calc(${
          100 * len
        }%); display:flex; transition:1s;`;
        Array.from(target.children).forEach(
          // (res) => (res.style.cssText = `width:calc(${100 / len})%;`)
          (res) => (res.style.cssText = "width:100%")
        );
      } else if (len == 1) {
        const button = wrap.children[0];
        button.style.cssText = "display:none;";
      }
    });
}
const workercode = () => {
  /**
   * @description Trigger when user send postmessage to worker
   */
  onmessage = (e) => {
    // Destructure the variables sent from main thread
    const [width, height, pixels, id] = e.data;
    // let counter = 1; // Counter for keeping number of pixels record
    /**
     *  Iterate for R, G and B and get unique [r, g, b] set combination
     */
    for (let r = 8; r <= 256; r += 8) {
      for (let g = 8; g <= 256; g += 8) {
        for (let b = 8; b <= 256; b += 8) {
          const x = Math.floor(Math.random() * width);
          const y = Math.floor(Math.random() * height);
          const off = (y * id.width + x) * 4;
          pixels[off] = r;
          pixels[off + 1] = g;
          pixels[off + 2] = b;
          pixels[off + 3] = 255;
          // if (x > width / 2) {
          //   pixels[off + 3] = 255 * (1 - ((x - width / 10) / (width / 10)));
          // }
          // console.log(
          //   `R, G, B values for each pixel ${counter}`,
          //   r,
          //   g,
          //   b,
          //   "\n",
          // );
          // counter += 1;
        }
      }
    }
    // Send updated pixels values back to main thread
    postMessage([pixels]);
  };
};

// Make worker work without Ejecting from CRA
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const workerScript = URL.createObjectURL(blob);

export default workerScript;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.js'
  ],
  theme: {
    extend: {
        animation: {
            "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
            "slide-out-right": "slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
            "slide-in-bottom": "slide-in-bottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
            "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
        },
        keyframes: {
            "slide-in-right": {
                "0%": {
                    transform: "translateX(1000px)",
                    opacity: "0"
                },
                to: {
                    transform: "translateX(0)",
                    opacity: "1"
                }
            },
            "slide-out-right": {
              "0%": {
                  transform: "translateX(0)",
                  opacity: "1"
              },
              to: {
                  transform: "translateX(1000px)",
                  opacity: "0"
              }
            },
            "slide-in-bottom": {
              "0%": {
                  transform: "translateY(1000px)",
                  opacity: "0"
              },
              "30%": {
                transform: "translateY(1000px)",
                opacity: "0"
              },
              to: {
                  transform: "translateY(0)",
                  opacity: "1"
              }
          },
          "slide-in-left": {
            "0%": {
                transform: "translateX(-1000px)",
                opacity: "0"
            },
            to: {
                transform: "translateX(0)",
                opacity: "1"
            }
        }
        }
    }
  },
  plugins: [],
}

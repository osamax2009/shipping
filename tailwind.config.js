const defaultTheme = require('tailwindcss/defaultTheme');
const { withAnimations } = require('animated-tailwindcss')



module.exports = withAnimations({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                
                'sans': ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors : {
                "appGreen" : "#4caf50",
            }
        },
    },

    plugins: [
        require('@tailwindcss/forms'), 
        require('@tailwindcss/typography'), 
        require("daisyui"),
      
    ],
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#060606',
        background: '#E0E0E0',
        disabled: '#D9D9D9',
        orange: '#FF993A',
        redText: '#DF6951',
        purpleText: '#181E4B',
        lightPurpleText: '#5E6282',
        yellowColor: '#F1A501',
        textWhite: '#fff',
        buttonColor: '#DF6951'
      },
      backgroundImage: {
        advertise1:
          "url('https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-9/187021823_4184467238258672_5017354143355795029_n.jpg?_nc_cat=110&cb=99be929b-59f725be&ccb=1-7&_nc_sid=e3f864&_nc_ohc=bJB3W5Jzut4AX9HzWQq&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfAp2CMxLZo0hmqVU6cT7UT79j-G1JKiKCQSZom0R87zgQ&oe=64CC4DED')",
        advertise2:
          "url('https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/121965175_3552593774779358_5781816656551211982_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=e3f864&_nc_ohc=ke1xUDqJ8CQAX_Gzzg8&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfB2o_PV96aGyhUzCfYsFMbJmRaDsyOeUa7ghdaaP34RFQ&oe=64CC4ACC')"
      }
    }
  },
  plugins: []
}

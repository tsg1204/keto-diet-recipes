export const Colors = {
  primaryColor: "#8bc34a",
  secondaryColor: "#795548" 
}

export const CATEGORIES = [
  {id: "1", title: "15 minute meals"},
  {id: "2", title: "Low carb"},
  {id: "3", title: "Quick & Easy"},
  {id: "4", title:"Refined sugar"},
  {id: "5", title: "Slow Cooker"},
  {id: "6", title: "Vegetarian"},
  {id: "7", title: "Vegan"}
];

export const MEALS = [
  {
    id: "1",
    category: ["1"],
    title: "Chilli, pea, bacon and fetta pasta",
    imageUrl: "https://img.taste.com.au/yN_83Ze6/w643-h428-cfill-q90/taste/2016/11/chilli-pea-bacon-and-fetta-pasta-105956-1.jpeg",
    duration: 10,//duration
    ingredients: [
      "375g orecchiette pasta",
      "1 1/2 cups frozen peas",
      "175g shortcut bacon rashers, trimmed, chopped",
      "4 garlic cloves, thinly sliced",
      "1 long red chilli, thinly sliced",
      "80g marinated fetta, reserving",
      "2 tablespoons marinating oil",
      "1/2 cup fresh mint leaves"
    ],
    steps: [
      "Cook pasta following packet directions until tender, adding peas for the last 2 minutes of cooking time. Drain.",
      "Meanwhile, heat olive oil in a large, deep frying pan over medium-high heat. Add bacon and garlic. Cook for 4 minutes or until golden. Add chilli. Cook for 1 minute or until softened.",
      "Add pasta, crumbled fetta, reserved marinating oil and mint to bacon mixture. Season with salt and pepper. Toss to combine. Serve."
    ],
    favorite: false
  },
  {
    id: "2",
    category: ["1", "3"],
    title: "Burgers with the lot",
    imageUrl: "https://img.taste.com.au/CSuK5ujx/w643-h428-cfill-q90/taste/2016/11/burgers-with-the-lot-101230-1.jpeg",
    duration: 6,//duration
    ingredients: [
      "150g canned beetroot, drained, grated",
      "2 tablespoons olive oil",
      "500g beef mince",
      "1 garlic clove, crushed",
      "Finely grated zest of 1/2 lemon",
      "1 tablespoon chopped rosemary leaves",
      "2 tablespoons marinating oil1 tablespoon chopped oregano leaves",
      "1/2 cup fresh mint leav4 English muffins, split, toastedes",
      "1 cup rocket leaves",
      "2 tomatoes, sliced",
      "4 eggs, fried sunny-side up"
    ],
   steps: [
      "To make the beetroot relish, combine beetroot with 1 tbs olive oil. Season.ook pasta following packet directions until tender, adding peas for the last 2 minutes of cooking time. Drain.",
      "Combine the beef with the garlic, lemon zest and herbs, then season. Use your hands to shape mixture into four 9cm patties. Heat remaining 1 tbs oil in a frypan over medium heat and cook for 3 minutes each side or until cooked to your liking.Meanwhile, heat olive oil in a large, deep frying pan over medium-high heat. Add bacon and garlic. Cook for 4 minutes or until golden. Add chilli. Cook for 1 minute or until softened.",
      "Layer the muffin bases with rocket, tomato, beetroot relish, patties and eggs, then season and top with muffin lids.Add pasta, crumbled fetta, reserved marinating oil and mint to bacon mixture. Season with salt and pepper. Toss to combine. Serve."
    ],
    favorite: false
  },
  {
    id: "3",
    category: ["2"],
    title: "Olive oil poached salmon",
    imageUrl: "https://img.taste.com.au/lESTs8vn/w643-h428-cfill-q90/taste/2016/11/olive-oil-84695-2.jpeg",
    duration: 45,//duration
    ingredients: [
      "2 small lemons, thinly sliced",
      "8 sprigs fresh basil, trimmed",
      "2 garlic cloves, thinly sliced",
      "1 teaspoon whole black peppercorns",
      "1 tablespoon capers, roughly chopped",
      "4 (750g) salmon fillets",
      "3 cups olive oil",
      "Baby spinach, to serve",
      "Tomato, to serve",
      "Kalamata olives, to ser",
      "Red onion, to serve"
    ],
    steps: [
      "Preheat oven to 130°C/110°C fan-forced. Place half the lemon slices over the base of an 8 cup-capacity ovenproof dish. Top with half the basil, half the garlic, half the peppercorns and half the capers. Place fish in dish. Top with remaining basil, garlic, peppercorns and capers. Pour oil over fish (oil should just cover fish).",
      "Bake fish for 40 to 45 minutes for medium or until cooked to your liking.",
      "Using a slotted spoon, transfer fish to a plate. Flake. Serve with lemon slices and spinach mixture."
    ],
    favorite: false
  },
  {
    id: "4",
    category: ["3"],
    title: "Lemon haloumi with fried capers",
    imageUrl: "https://img.taste.com.au/3leubigm/w720-h480-cfill-q80/taste/2016/11/lemon-haloumi-with-fried-capers-72418-1.jpeg",
    duration: 10,//duration
    ingredients: [
      "1 1/2 tablespoons extra virgin olive oil",
      "180g haloumi, sliced",
      "2 small red birdseye chillies, thinly sliced",
      "2 teaspoons drained baby capers",
      "1 teaspoon finely grated lemon rind",
      "2 tablespoons lemon juice",
      "80g mixed lettuce leaves"
    ],
    steps: [
      "Heat 2 teaspoons oil in a large frying pan over medium-high heat. Cook haloumi, in batches, for 2 minutes each side or until golden. Transfer to a plate.",
      "Heat remaining oil in pan. Add chilli and capers. Cook, stirring, for 3 to 5 minutes or until capers are heated through and chilli is golden. Add rind. Cook, stirring, for 1 minute. Stir in juice. Bring to a simmer.",
      "Arrange haloumi and lettuce on a serving plate. Drizzle with hot lemon mixture. Season with pepper. Serve immediately."
    ],
    favorite: false
  },
  {
    id: "5",
    category: ["4"],
    title: "Sugar-free mango and coconut balls",
    imageUrl: "https://img.taste.com.au/enssRrT8/w643-h428-cfill-q90/taste/2018/12/sugar-free-mango-and-coconut-balls-145720-2.jpg",
    duration: 20,//duration
    ingredients: [
      "125g dried mango",
      "50g (2/3 cup) shredded coconut",
      "50g (1/2 cup) rolled oats",
      "145g (1 cup) raw cashews",
      "60g (3/4 cup) desiccated coconut",
      "1 tablespoon finely grated lime zest",
      "1 teaspoon vanilla extract"
    ],
    steps: [
      "Use kitchen scissors to cut the mango into small (about 1.5cm) pieces. Place in a heatproof bowl and pour 125 ml (½ cup) of boiling water. Set aside for 10-15 minutes, stirring occasionally, or until mango has softened and water absorbed.",
      "Place the shredded coconut in a frying pan and stir over medium heat for about 3 minutes or until golden. Transfer to a plate to cool.",
      "Process the oats a food processor until well chopped. Add the cashews, desiccated coconut, lime zest, vanilla, a pinch of salt and mango (with any water that may not have absorbed). Process until well combined."
    ],
    favorite: false
  },
  {
    id: "6",
    category: ["4"],
    title: "Better-for-you banana pancakes",
    imageUrl: "https://img.taste.com.au/ae10R411/w643-h428-cfill-q90/taste/2018/01/better-for-you-banana-pancakes-134286-1.jpg",
    duration: 50,//duration
    ingredients: [
      "100g mashed banana (about 1 medium banana)",
      "150g (1 cup) wholemeal plain flour or purple wheat plain flour (see tip)",
      "60g (1/2 cup) almond meal or hazelnut meal",
      "1 teaspoon ground cinnamon",
      "4 eggs",
      "150ml milk kefir (see tip)",
      "1 tablespoon virgin macadamia oil or coconut oil",
      "2 teaspoons baking powder",
      "125g (1/2 cup) fresh ricotta, to serve (optional)",
      "Mixed berries, to serve",
      "Pure maple syrup, to serve"
    ],
    steps: [
      "Place the banana, flour, nut meal, cinnamon, eggs, kefir and 2 tsp oil in a blender or a food processor. Blend or process until smooth and well combined. Add the baking powder and process for a further 5-10 seconds, until just combined.",
      "Heat a non-stick frying pan over medium-high heat. Add 1 tsp of the remaining oil. Pour 1/4-cupful of batter into the pan and gently swirl to create a pancake about 12cm in diameter. Cook for 1-2 minutes, until bubbles begin to form on the surface and the pancake is golden underneath. Carefully flip and cook for a further 1-2 minutes, until golden on both sides and cooked through. Transfer to a plate and cover loosely with foil to keep warm. Repeat with the remaining mixture (and remaining 1 tsp oil, if needed) until all the batter has been used.",
      "Divide the pancakes among serving plates. Top each stack with 11 ⁄2 tbs ricotta, if you like. Scatter with the mixed berries and serve with a light drizzle of maple syrup."
    ],
    favorite: false
  },
  {
    id: "7",
    category: ["3","2"],
    title: "Green chicken curry with coconut sambal",
    imageUrl: "https://img.taste.com.au/zc_lBooQ/w720-h480-cfill-q80/taste/2020/02/mar20_green-chicken-curry-with-coconut-sambal-158600-1.jpg",
    duration: 15,
    ingredients: [
      "1 tbs vegetable oil",
      "450g pkt Coles Made Easy Thai Green Chicken Stir Fry with Capsicum and Green Beans",
      "250g pkt Coles Coconut Chilli Lime Rice",
      "COCONUT SAMBAL:",
      "1/2 cup finely chopped coriander",
      "1/4 red onion, finely chopped",
      "1/4 cup (20g) shredded coconut, toasted",
      "2 tbs lime juice"
    ],
    steps: [
      "Heat the oil in a wok or large deep frying pan over medium heat. Add the chicken mixture and cook, stirring occasionally, for 8 mins. Add 1/4 cup (60ml) of water and cook for 2 mins or until the chicken is cooked through.",
      "Meanwhile, heat the rice in the microwave following packet directions.",
      "To make the coconut sambal, combine the coriander, onion, coconut and lime juice in a small bowl. Season.",
      "Divide rice and curry between serving bowls. Sprinkle with the coconut sambal."
    ],
    favorite: false
  },
  {
    id: "8",
    category: ["5","6"],
    title: "Slow-cooker cauliflower korma",
    imageUrl: "https://img.taste.com.au/jI_aBAUp/w643-h428-cfill-q90/taste/2018/07/slow-cooker-cauliflower-korma-1-139455-1.jpg",
    duration: 5,
    ingredients: [
      "500ml (2 cups) Massel vegetable liquid stock",
      "125ml (1/2 cup) tomato passata",
      "60g (1/4 cup) korma curry paste",
      "60ml (1/4 cup) pouring cream",
      "2 teaspoons cornflour",
      "1 ripe tomato, deseeded, finely chopped",
      "Long fresh green chilli, sliced, to serve",
      "Fresh coriander sprigs, to serve",
      "Flaked almonds, toasted, to serve",
      "Roti (optional), to serve"
    ],
    steps: [
      "Whisk together the stock, passata and korma paste in a slow cooker. Place the cauliflower upside down in the mixture and turn to coat. Stand upright and cover. Cook on low for 5 hours or until the cauliflower is tender.",
      "Baste the cauliflower with the liquid in the slow cooker. Combine the yoghurt, cream and cornflour in a small jug. Add to the slow cooker and stir to combine. Cook for a further 10 minutes or until the sauce has thickened.",
      "Serve cauliflower sprinkled with tomato, chilli, coriander and almonds. Serve with roti, if using."
    ],
    favorite: false
  },
  {
    id: "9",
    category: ["2","3","7"],
    title: "Avocado and cucumber salad",
    imageUrl: "https://img.taste.com.au/v_-QrRbu/w643-h428-cfill-q90/taste/2016/11/avocado-and-cucumber-salad-81197-1.jpeg",
    duration: 10,
    ingredients: [
      "175g baby salad leaves",
      "2 medium avocados, chopped",
      "4 green onions, thinly sliced",
      "2 Lebanese cucumbers, halved, thinly sliced",
      "1/4 cup lemon juice",
      "1/4 cup olive oil"
    ],
    steps: [
      "Combine salad leaves, avocado, onion and cucumber in a bowl. Place lemon juice and oil in a screw-top jar. Season with salt."
    ],
    favorite: false
  }
];

export const RECIPES = {
  available: MEALS,
  favorites: []
}


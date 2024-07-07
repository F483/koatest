
 

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('activities').del()
  await knex('activities').insert([
    {
        title: 'Dancing with the Shadows of Time',
        description: 'Navigate through cosmic mysteries, uncovering secrets of timeless wonders.',
        category: 'Relaxation',
        difficulty: 'Easy',
        duration: 30,
        content: 'Discover hidden realms echoing ancient lore and cosmic wonders.',
    },
    {
        title: 'Journeying Through the Eternal Veil',
        description: 'Journey through veiled paths of forgotten dreams and untold secrets.',
        category: 'Self-Esteem',
        difficulty: 'Medium',
        duration: 60,
        content: 'Navigate cosmic mysteries and uncover timeless secrets.',
    },
    {
        title: 'Exploring the Celestial Horizons',
        description: 'Discover the whispers of ancient celestial adventures and mystical realms.',
        category: 'Productivity',
        difficulty: 'Hard',
        duration: 120,
        content: 'Journey along veiled paths of forgotten dreams and truths.',
    },
    {
        title: 'Navigating the Cosmic Labyrinth',
        description: 'Dive into the enigmatic depths of ancient myths and lost civilizations.',
        category: 'Physical Health',
        difficulty: 'Easy',
        duration: 30,
        content: 'Explore the whispers of ancient celestial adventures.',
    },
    {
        title: 'Embracing the Whispers of Dawn',
        description: 'Wander through the labyrinth of cosmic enchantments and hidden treasures.',
        category: 'Social Connection',
        difficulty: 'Medium',
        duration: 60,
        content: 'Embark on quests through eternal shadows and light.',
    },
    {
        title: 'Discovering Forgotten Realms',
        description: 'Explore hidden realms echoing with ancient lore and celestial wonders.',
        category: 'Relaxation',
        difficulty: 'Hard',
        duration: 120,
        content: 'Dive into the enigmatic depths of ancient myths and legends.',
    },
    {
        title: 'Traversing the Enigmatic Paths',
        description: 'Navigate through cosmic mysteries, uncovering timeless secrets and wonders.',
        category: 'Self-Esteem',
        difficulty: 'Easy',
        duration: 30,
        content: 'Wander labyrinths of cosmic enchantments and mysteries.',
    },
    {
        title: 'Capturing Fragments of Eternity',
        description: 'Journey along veiled paths of forgotten dreams and hidden truths.',
        category: 'Productivity',
        difficulty: 'Medium',
        duration: 60,
        content: 'Embrace the silence of timeless explorations and secrets.',
    },
    {
        title: 'Sailing the Sea of Lost Dreams',
        description: 'Discover the whispers of ancient celestial adventures and myths.',
        category: 'Physical Health',
        difficulty: 'Hard',
        duration: 120,
        content: 'Sail seas of lost memories, uncovering hidden treasures.',
    },
    {
        title: 'Unraveling the Secrets of Night',
        description: 'Traverse celestial landscapes, exploring echoes of forgotten worlds.',
        category: 'Social Connection',
        difficulty: 'Easy',
        duration: 30,
        content: 'Traverse celestial landscapes, exploring forgotten worlds.',
    },
  ]);
};

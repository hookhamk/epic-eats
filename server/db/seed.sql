INSERT INTO user

INSERT INTO spoon_eats (id, title, image_url, source_url, summary, instructions, ingredients)
VALUES (
    12345,
    'Chicken Alfredo',
    'https://example.com/image.jpg',
    'https://example.com/full-recipe',
    'A delicious pasta dish...',
    '[{"step_number": 1, "description": "Boil water and cook pasta."}, {"step_number": 2, "description": "Melt butter in a pan."}]'::jsonb,
    '[{"name": "flour", "amount": 2, "unit": "cups"}, {"name": "butter", "amount": 0.5, "unit": "cup"}]'::jsonb
);

<?php
// 🎯 PHP Random Quote Generator
$quotes = [
  "Stay hungry, stay foolish.",
  "Talk is cheap. Show me the code.",
  "Simplicity is the soul of efficiency.",
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "Code never lies, comments sometimes do.",
  "Experience is the name everyone gives to their mistakes."
];
$quote = $quotes[array_rand($quotes)];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PHP Random Quote Generator</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    }
    .quote-box {
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0 6px 25px rgba(0, 0, 0, .08);
      padding: 2.5rem;
      max-width: 600px;
      text-align: center;
    }
    .quote-text {
      font-size: 1.4rem;
      font-style: italic;
      margin-bottom: 1.2rem;
      color: #333;
    }
    .btn-generate {
      border-radius: 50px;
      padding: .6rem 1.5rem;
    }
    footer {
      margin-top: 2rem;
      color: #888;
      font-size: .9rem;
    }
  </style>
</head>
<body>

  <main class="quote-box container">
    <h1 class="mb-4">🎯 PHP Random Quote Generator</h1>
    <p class="quote-text">“<?= htmlspecialchars($quote) ?>”</p>
    <form method="post">
      <button type="submit" class="btn btn-dark btn-generate">🔁 Generate Again</button>
    </form>
    <footer>Refresh or click the button to see another quote.</footer>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

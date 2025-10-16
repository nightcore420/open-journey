
---

# 💻 `showcase/2025/php/php-currency-converter/index.php`
```php
<?php
// 💱 PHP Currency Converter (Static Rates, Bootstrap)

// Base currency for rates: USD
$rates = [
  "USD" => 1.00,
  "EUR" => 0.92,
  "IDR" => 15500,
  "JPY" => 150,
  "GBP" => 0.78,
];

$amount = isset($_POST['amount']) ? (float)$_POST['amount'] : 0.0;
$from   = $_POST['from'] ?? "USD";
$to     = $_POST['to']   ?? "IDR";
$error  = "";
$result = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($rates[$from], $rates[$to])) {
    $error = "Unsupported currency.";
  } elseif (!is_numeric($_POST['amount']) || $amount < 0) {
    $error = "Amount must be a non-negative number.";
  } else {
    // normalize to USD then to target
    $usd = $amount / $rates[$from];
    $result = $usd * $rates[$to];
  }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PHP Currency Converter</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body{background:#f7f7fb;min-height:100vh;display:flex;align-items:center;justify-content:center}
    .card{border-radius:1rem;box-shadow:0 10px 30px rgba(0,0,0,.08);max-width:720px;width:100%}
  </style>
</head>
<body>
  <div class="container py-4">
    <div class="card p-4 p-md-5 mx-auto">
      <h1 class="h4 mb-3">💱 PHP Currency Converter</h1>
      <p class="text-muted mb-4">Static demo using a PHP array of exchange rates (base: USD). No API, no database.</p>

      <?php if ($error): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <form method="post" class="row g-3 align-items-end">
        <div class="col-md-4">
          <label class="form-label">Amount</label>
          <input type="number" step="0.01" min="0" name="amount" value="<?= htmlspecialchars((string)$amount) ?>" class="form-control" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">From</label>
          <select name="from" class="form-select">
            <?php foreach($rates as $code => $r): ?>
              <option value="<?= $code ?>" <?= $from===$code?'selected':'' ?>><?= $code ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="col-md-1 text-center">
          <span class="d-block mb-2">→</span>
        </div>
        <div class="col-md-3">
          <label class="form-label">To</label>
          <select name="to" class="form-select">
            <?php foreach($rates as $code => $r): ?>
              <option value="<?= $code ?>" <?= $to===$code?'selected':'' ?>><?= $code ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="col-md-1 d-grid">
          <button class="btn btn-dark" type="submit">Convert</button>
        </div>
      </form>

      <?php if ($result !== null): ?>
        <hr class="my-4">
        <div class="alert alert-secondary mb-0">
          <strong>Result:</strong>
          <?= number_format($amount, 2) ?> <?= htmlspecialchars($from) ?>
          =
          <strong><?= number_format($result, 2) ?> <?= htmlspecialchars($to) ?></strong>
        </div>
      <?php endif; ?>

      <hr class="my-4">
      <small class="text-muted">
        Rates are static for demo purposes. Update the <code>$rates</code> array to adjust values.
      </small>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

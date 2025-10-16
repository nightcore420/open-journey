
---

# 💻 `showcase/2025/php/php-contact-form/index.php`
```php
<?php
// 📮 PHP Contact Form (TXT Saver) — Bootstrap 5

$ok = $err = "";
// Persist captcha values across POST using hidden inputs
$qa = $_POST['qa'] ?? random_int(1,9);
$qb = $_POST['qb'] ?? random_int(1,9);
$expect = (int)$qa + (int)$qb;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name  = trim($_POST['name']  ?? '');
  $email = trim($_POST['email'] ?? '');
  $msg   = trim($_POST['msg']   ?? '');
  $ans   = (int)($_POST['ans']  ?? -1);

  if ($name === '' || $email === '' || $msg === '') {
    $err = "Please fill in all fields.";
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $err = "Invalid email address.";
  } elseif ($ans !== $expect) {
    $err = "Anti-spam failed. Try again.";
  } else {
    $row = sprintf("[%s] %s <%s> : %s%s",
      date('Y-m-d H:i:s'),
      str_replace(["\r","\n"], ' ', $name),
      $email,
      str_replace(["\r","\n"], ' ', $msg),
      PHP_EOL
    );
    $file = __DIR__ . '/messages.txt';
    $fp = fopen($file, 'a');
    if ($fp) {
      if (flock($fp, LOCK_EX)) { fwrite($fp, $row); flock($fp, LOCK_UN); }
      fclose($fp);
      $ok = "Thanks! Your message was saved.";
    } else {
      $err = "Cannot write to messages.txt (check permissions).";
    }
    // Reset captcha for next submit
    $qa = random_int(1,9); $qb = random_int(1,9);
  }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PHP Contact Form (TXT Saver)</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f7f7fb}
    .card{box-shadow:0 10px 30px rgba(0,0,0,.08);border-radius:1rem}
    .form-text small{color:#888}
  </style>
</head>
<body>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-6">
        <div class="card p-4 p-md-5">
          <h1 class="h3 mb-3">📮 PHP Contact Form</h1>
          <p class="text-muted mb-4">Single-file form that saves to <code>messages.txt</code>.</p>

          <?php if ($ok): ?>
            <div class="alert alert-success"><?= htmlspecialchars($ok) ?></div>
          <?php endif; ?>
          <?php if ($err): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($err) ?></div>
          <?php endif; ?>

          <form method="post" novalidate>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input class="form-control" name="name" required value="<?= htmlspecialchars($_POST['name'] ?? '') ?>">
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input class="form-control" type="email" name="email" required value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
            </div>
            <div class="mb-3">
              <label class="form-label">Message</label>
              <textarea class="form-control" name="msg" rows="4" required><?= htmlspecialchars($_POST['msg'] ?? '') ?></textarea>
            </div>

            <?php $question = "{$qa} + {$qb} = ?"; ?>
            <input type="hidden" name="qa" value="<?= htmlspecialchars($qa) ?>">
            <input type="hidden" name="qb" value="<?= htmlspecialchars($qb) ?>">

            <div class="mb-3">
              <label class="form-label">Anti-spam</label>
              <div class="input-group">
                <span class="input-group-text"><?= $question ?></span>
                <input class="form-control" name="ans" inputmode="numeric" required>
              </div>
              <div class="form-text"><small>Solve the math above to submit.</small></div>
            </div>

            <button class="btn btn-dark w-100" type="submit">Send Message</button>
          </form>

          <hr class="my-4">
          <p class="text-muted small mb-0">
            Submissions are appended to <code>messages.txt</code> in this folder.  
            Make sure the web server can write to this directory.
          </p>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

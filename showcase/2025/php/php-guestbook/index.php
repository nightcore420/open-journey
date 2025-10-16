
---

# 💻 `showcase/2025/php/php-guestbook/index.php`
```php
<?php
// 📔 PHP Guestbook (JSON, Bootstrap)

$file = __DIR__ . '/guestbook.json';
if (!file_exists($file)) {
  file_put_contents($file, "[]");
}

function read_entries($path) {
  $raw = @file_get_contents($path);
  $data = json_decode($raw ?: "[]", true);
  return is_array($data) ? $data : [];
}

function write_entries($path, $entries) {
  $json = json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  $fp = fopen($path, 'c+');
  if (!$fp) return false;
  if (flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    fwrite($fp, $json);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return true;
  }
  fclose($fp);
  return false;
}

$err = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name'] ?? '');
  $msg  = trim($_POST['msg']  ?? '');

  if ($name === '' || $msg === '') {
    $err = "Please fill in both name and message.";
  } elseif (mb_strlen($name) > 60) {
    $err = "Name is too long (max 60 chars).";
  } elseif (mb_strlen($msg) > 1000) {
    $err = "Message is too long (max 1000 chars).";
  } else {
    $entries = read_entries($file);
    array_unshift($entries, [
      'name' => $name,
      'msg'  => $msg,
      'time' => time()
    ]);
    // keep only latest 100
    if (count($entries) > 100) $entries = array_slice($entries, 0, 100);
    write_entries($file, $entries);
    // PRG pattern to avoid resubmission
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
  }
}

$entries = read_entries($file);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PHP Guestbook (JSON)</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body{background:#f7f7fb;min-height:100vh}
    .wrap{max-width:800px}
    .card{box-shadow:0 10px 30px rgba(0,0,0,.06);border-radius:1rem}
    .entry{border:1px solid #eee;border-radius:.75rem;padding:12px 14px;margin-bottom:10px;background:#fff}
  </style>
</head>
<body>
  <div class="container py-5">
    <div class="wrap mx-auto">
      <div class="card p-4 p-md-5">
        <h1 class="h3 mb-3">📔 PHP Guestbook</h1>
        <p class="text-muted mb-4">Post a message below. Stored in <code>guestbook.json</code> (no database).</p>

        <?php if ($err): ?>
          <div class="alert alert-danger"><?= htmlspecialchars($err) ?></div>
        <?php endif; ?>

        <form method="post" class="mb-4" novalidate>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Name</label>
              <input class="form-control" name="name" required value="<?= htmlspecialchars($_POST['name'] ?? '') ?>">
            </div>
            <div class="col-md-8">
              <label class="form-label">Message</label>
              <textarea class="form-control" name="msg" rows="2" required><?= htmlspecialchars($_POST['msg'] ?? '') ?></textarea>
            </div>
          </div>
          <div class="d-grid d-md-flex mt-3">
            <button class="btn btn-dark" type="submit">Post Message</button>
          </div>
          <div class="form-text mt-2">
            <small>Newest messages appear first. Max 100 entries kept.</small>
          </div>
        </form>

        <h2 class="h5 mb-3">Recent Messages</h2>
        <?php if (!$entries): ?>
          <p class="text-muted">No messages yet. Be the first!</p>
        <?php else: ?>
          <?php foreach ($entries as $e): ?>
            <div class="entry">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <strong><?= htmlspecialchars($e['name']) ?></strong>
                <small class="text-muted"><?= date('Y-m-d H:i', (int)$e['time']) ?></small>
              </div>
              <div><?= nl2br(htmlspecialchars($e['msg'])) ?></div>
            </div>
          <?php endforeach; ?>
        <?php endif; ?>

      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

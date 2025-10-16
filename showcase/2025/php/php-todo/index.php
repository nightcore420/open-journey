
---

# 💻 `showcase/2025/php/php-todo/index.php`
```php
<?php
// ✅ PHP Todo List (JSON, Bootstrap)

$file = __DIR__ . '/tasks.json';
if (!file_exists($file)) file_put_contents($file, "[]");

function read_tasks($f){ $d=json_decode(@file_get_contents($f) ?: "[]",true); return is_array($d)?$d:[]; }
function save_tasks($f,$d){ file_put_contents($f,json_encode($d,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE),LOCK_EX); }

$tasks = read_tasks($file);

// handle add
if ($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['title'])){
  $t=trim($_POST['title']);
  if($t!==""){ $tasks[]=['title'=>$t,'done'=>false]; save_tasks($file,$tasks);}
  header("Location: ".$_SERVER['PHP_SELF']); exit;
}
// toggle
if(isset($_GET['toggle'])){ $i=(int)$_GET['toggle']; if(isset($tasks[$i])){$tasks[$i]['done']=!$tasks[$i]['done']; save_tasks($file,$tasks);}
  header("Location: ".$_SERVER['PHP_SELF']); exit; }
// delete
if(isset($_GET['del'])){ $i=(int)$_GET['del']; if(isset($tasks[$i])){array_splice($tasks,$i,1); save_tasks($file,$tasks);}
  header("Location: ".$_SERVER['PHP_SELF']); exit; }
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PHP Todo List</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body{background:#f7f7fb;min-height:100vh}
.container{max-width:700px}
.card{border-radius:1rem;box-shadow:0 8px 25px rgba(0,0,0,.08)}
.done{text-decoration:line-through;color:#999}
</style>
</head>
<body>
<div class="container py-5">
  <div class="card p-4 p-md-5">
    <h1 class="h4 mb-3">✅ PHP Todo List</h1>
    <p class="text-muted mb-4">Add, toggle, or delete tasks — saved in <code>tasks.json</code>.</p>

    <form method="post" class="d-flex gap-2 mb-3">
      <input name="title" class="form-control" placeholder="New task..." required>
      <button class="btn btn-dark">Add</button>
    </form>

    <?php if(!$tasks): ?>
      <p class="text-muted">No tasks yet. Start adding something!</p>
    <?php else: ?>
      <ul class="list-group">
        <?php foreach($tasks as $i=>$t): ?>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <a href="?toggle=<?=$i?>" class="<?= $t['done']?'done':'' ?> text-decoration-none flex-grow-1">
              <?= htmlspecialchars($t['title']) ?>
            </a>
            <div>
              <a href="?toggle=<?=$i?>" class="btn btn-sm <?= $t['done']?'btn-success':'btn-outline-success' ?>">
                <?= $t['done']?'✔':'✓' ?>
              </a>
              <a href="?del=<?=$i?>" onclick="return confirm('Delete this task?')" class="btn btn-sm btn-outline-danger">🗑</a>
            </div>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <hr class="my-4">
    <small class="text-muted">Data saved in <code>tasks.json</code>. Refresh safe.</small>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

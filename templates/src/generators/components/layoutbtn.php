<?php
if (!function_exists('generate_component_layoutbtn')) {
    function generate_component_layoutbtn($data)
    {
        $data_defaults = [
            'value' => null,
            'class' => null,
        ];

        extract(array_merge($data_defaults, $data));
        ob_start();
?>
        <div class="<?= $class; ?>"> <?= $value; ?> </div>
<?php
        return ob_get_clean();
    }
}
?>
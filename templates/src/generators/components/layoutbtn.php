<?php
if (!function_exists('generate_component_layoutBtn')) {
    function generate_component_layoutBtn($data)
    {
        $data_defaults = [
            'value' => null,
            'class' => null,
            'custom_data_value' => null,
        ];

        extract(array_merge($data_defaults, $data));
        ob_start();
?>
        <div class="<?= $class; ?>" data-value="<?= $custom_data_value; ?>"> <?= $value; ?> </div>
<?php
        return ob_get_clean();
    }
}
?>
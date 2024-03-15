		</div>

		<footer class="footer">
			<div class="footer__inner">
				<div class="footer__inner__brand col">
					<img class="footer__inner__brand__image" src="/assets/images/logo.svg" alt="Segelteam">
					<h6 class="footer__inner__brand__copy">&copy; 2021. Segel-Team. Alle Rechte vorbehaiten</h6>
				</div>
				<div class="footer__inner__links col">
					<div class="footer__inner__links__pages">
						<div class="footer__inner__links__pages__left">
							<a href="#"><span>About us</span></a>
							<a href="#"><span>Gallery</span></a>
							<a href="#"><span>Crew</span></a>
							<a href="#"><span>Contact</span></a>
						</div>
						<div class="footer__inner__links__pages__right">
							<a href="#"><span>Impressum</span></a>
							<a href="#"><span>Datenschutz</span></a>
							<a href="#"><span>Rechtliches</span></a>
							<a href="#"><span>Copyright</span></a>
						</div>
					</div>
					<div class="footer__inner__links__social">
						<?php
						$icons = array("facebook", "twitter", "instagram", "youtube");
						foreach ($icons as $i) {
							echo generate_component_button([
								'class' => 'social',
								'icon' => $i,
								'icon_type' => 'symbol',
							]);
						}
						?>
					</div>
				</div>
			</div>
		</footer>

		<script type="text/javascript" src="<?php echo add_file_version($assets_uri . 'scripts/main.js') ?>"></script>

		</body>

		</html>
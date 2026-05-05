import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TakeControlSection = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const target = `/signup${email ? `?email=${encodeURIComponent(email)}` : ''}`;
		navigate(target);
	};

	return (
		<section className="flex w-full flex-col items-center ">
			<div className="w-full max-w-400 px-6 py-12 md:max-w-307 md:px-8 md:py-16 lg:max-w-400 lg:px-12 lg:py-20">

				{/* Two-col layout — stacks on mobile, row on desktop */}
				<div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

					{/* ── Left: heading + description + form ── */}
					<div className="flex w-full flex-col gap-6 lg:basis-1/2">
						{/* display-2 heading */}
						<h2 className="m-0 text-5xl font-normal leading-[1.02] tracking-tight text-gray-900 sm:text-6xl lg:text-[82px]">
							Take control <br/> of your money
						</h2>

						<div className="flex w-full max-w-225 flex-col gap-6">
							<p className="m-0 text-xl leading-8 text-gray-800">
								Start your portfolio today and discover crypto
							</p>

							{/* Email form */}
							<form noValidate onSubmit={handleSubmit} className="w-full">
									<div className="flex w-full flex-col items-stretch gap-3 sm:flex-row">
									{/* Input — max 400px on sm+ */}
										<div className="w-full sm:max-w-90">
										<input
											type="email"
											id="email-form-input"
											name="email"
											autoComplete="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="satoshi@nakamoto.com"
											aria-label="Email address"
											className="
												w-full h-12 px-4
													rounded-lg border border-gray-300
													bg-white text-gray-900 text-base
												outline-none
													hover:border-gray-400
													focus:border-blue-600 focus:ring-2 focus:ring-blue-100
												transition-colors duration-150
													placeholder:text-gray-500
											"
										/>
									</div>

									{/* Submit button — full width on mobile, auto on sm+ */}
									<button
										type="submit"
										className="
											w-full sm:w-auto
											inline-flex items-center justify-center
											px-8 h-12 min-w-25
											rounded-full bg-blue-600 text-white
											font-semibold text-lg leading-5
											border-none cursor-pointer
											transition-colors duration-150 hover:bg-blue-700
											whitespace-nowrap
										"
									>
										Sign up
									</button>
								</div>
							</form>
						</div>
					</div>

					{/* ── Right: crypto coins cluster image (1:1 aspect ratio) ── */}
					<div className="w-full lg:basis-1/2 flex items-center justify-center">
						<div className=" aspect-square">
							<picture>
								<source
									srcSet="https://images.ctfassets.net/o10es7wu5gm1/3Ib1lnukt8MvV4bDjH2jm7/00bd55a880ce264f3b77253b837760b2/image.png?fm=avif&h=3200&q=65"
									type="image/avif"
								/>
								<source
									srcSet="https://images.ctfassets.net/o10es7wu5gm1/3Ib1lnukt8MvV4bDjH2jm7/00bd55a880ce264f3b77253b837760b2/image.png?fm=webp&h=3200&q=75"
									type="image/webp"
								/>
								<img
									src="https://images.ctfassets.net/o10es7wu5gm1/3Ib1lnukt8MvV4bDjH2jm7/00bd55a880ce264f3b77253b837760b2/image.png"
									alt="Crypto illustration"
									loading="eager"
									width="4256"
									height="3200"
									className="w-full h-full object-contain"
								/>
							</picture>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
};

export default TakeControlSection;

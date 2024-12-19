import { useState } from "react";

const ethPrice = 4000.23;
const bnbPrice = 700.23;

const App = () => {
  const [isEthToBnb, setIsEthToBnb] = useState<boolean>(true); // true: продаем ETH, false: продаем BNB
  const [ethAmount, setEthAmount] = useState<number | string>(1);
  const [bnbAmount, setBnbAmount] = useState<number | string>(
    () => (1 * ethPrice) / bnbPrice
  );

  // Функция для пересчета BNB на основе ETH
  const calculateBnbFromEth = (eth: number): number =>
    (eth * ethPrice) / bnbPrice;

  // Функция для пересчета ETH на основе BNB
  const calculateEthFromBnb = (bnb: number): number =>
    (bnb * bnbPrice) / ethPrice;

  const handleSwitch = (): void => {
    setIsEthToBnb(!isEthToBnb);
    if (isEthToBnb) {
      setBnbAmount(calculateBnbFromEth(Number(ethAmount)) || 0);
    } else {
      setEthAmount(calculateEthFromBnb(Number(bnbAmount)) || 0);
    }
  };

  const handleEthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(",", ".");

    if (value === "" || value === ".") {
      setEthAmount("");
      setBnbAmount("");
      return;
    }

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setEthAmount(parsedValue);
      setBnbAmount(
        isEthToBnb
          ? calculateBnbFromEth(parsedValue)
          : calculateBnbFromEth(parsedValue)
      );
    }
  };

  const handleBnbChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(",", ".");

    if (value === "" || value === ".") {
      setBnbAmount("");
      setEthAmount("");
      return;
    }

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setBnbAmount(parsedValue);
      setEthAmount(
        !isEthToBnb
          ? calculateEthFromBnb(parsedValue)
          : calculateEthFromBnb(parsedValue)
      );
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="flex-col w-full max-w-[523px] shadow-[0_4px_40px_0_rgba(0,0,0,0.25)] bg-gradient-to-b from-[#222342] to-[rgba(34,35,66,0)] rounded-2xl mt-[50px]">
        <h1 className="font-bold text-white p-6">
          Swap<span className="ml-[14px] text-white opacity-30">Pools</span>
        </h1>
        <div className="flex justify-center mb-[8px] px-5">
          <div
            className="w-full max-w-[483px] p-6 rounded-2xl"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <h3 className="text-white opacity-70 mb-5">Вы продаете</h3>
            <div className="flex justify-between mb-5">
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                {isEthToBnb ? (
                  <img width={22} height={22} src="/cryg.svg" alt="img" />
                ) : (
                  <img width={22} height={22} src="/del.svg" alt="img" />
                )}
                {isEthToBnb ? "ETH" : "BNB"}
              </div>
              <input
                type="text"
                placeholder="0.0"
                inputMode="decimal"
                value={isEthToBnb ? ethAmount : bnbAmount}
                onChange={isEthToBnb ? handleEthChange : handleBnbChange}
                className="bg-transparent text-white w-[100px] text-right text-2xl font-bold"
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "-" || e.key === "+") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex justify-between text-white opacity-70">
              <h2>{isEthToBnb ? "ETH" : "BNB"}</h2>
              <h2>
                ~$
                {(isEthToBnb
                  ? Number(ethAmount) * ethPrice
                  : Number(bnbAmount) * bnbPrice
                ).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center relative">
          <button
            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-2xl hover:bg-blue-600 transition absolute z-10 -my-5"
            onClick={handleSwitch}
          >
            <span>
              <img width={20} height={20} src="/arrow.svg" alt="img" />
            </span>
          </button>
        </div>
        <div className="flex justify-center px-5">
          <div
            className="w-full max-w-[483px] p-5 rounded-2xl"
            style={{ background: "rgba(255, 255, 255, 0.2)" }}
          >
            <h3 className="text-white opacity-70 mb-5">Вы покупаете</h3>
            <div className="flex justify-between mb-5">
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                {isEthToBnb ? (
                  <img width={22} height={22} src="/del.svg" alt="img" />
                ) : (
                  <img width={22} height={22} src="/cryg.svg" alt="img" />
                )}
                {isEthToBnb ? "BNB" : "ETH"}
              </div>
              <input
                type="text"
                placeholder="0.0"
                inputMode="decimal"
                value={isEthToBnb ? bnbAmount : ethAmount}
                onChange={isEthToBnb ? handleBnbChange : handleEthChange}
                className="bg-transparent text-white w-[100px] text-right text-2xl font-bold"
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "-" || e.key === "+") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex justify-between text-white opacity-70">
              <h2>{isEthToBnb ? "BNB" : "ETH"}</h2>
              <h2>
                ~$
                {(isEthToBnb
                  ? Number(bnbAmount) * bnbPrice
                  : Number(ethAmount) * ethPrice
                ).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[20px] px-5">
          <h1
            className="flex items-center gap-[10px] max-w-[483px] w-full rounded-lg p-1 text-white"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <span className="ml-[20px]">
              <img width={20} height={20} src="/info.svg" alt="img" />
            </span>
            {isEthToBnb ? (
              <>
                <span className="text-white opacity-70">{`1 ETH = ${(
                  ethPrice / bnbPrice
                ).toFixed(2)} BNB `}</span>
                <span className="text-blue-500">{`($${ethPrice.toFixed(
                  2
                )})`}</span>
              </>
            ) : (
              <>
                <span className="text-white opacity-70">{`1 BNB = ${(
                  bnbPrice / ethPrice
                ).toFixed(2)} ETH `}</span>
                <span className="text-blue-500">{`($${bnbPrice.toFixed(
                  2
                )})`}</span>
              </>
            )}{" "}
          </h1>
        </div>
        <div className="flex justify-center mt-[20px] mb-[20px] px-5">
          <button className="flex items-center justify-center gap-[8px] w-full max-w-[483px] bg-blue-400 py-3 rounded-lg font-semibold text-white hover:bg-blue-600 transition">
            <span>
              <img width={22} height={22} src="/wallet.svg" alt="img" />
            </span>
            Connect walley
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function AdCard({ ad, className  }) {
  // Määritellään värit toiminnon mukaan const className = 'bg-custom-beige p-4 rounded-lg shadow-md';
  const badgeColor = ad?.action === "Sell" ? "#f6c25d" : "#cbc385";
  const cardClassName = `${className} relative z-10`; // Lisää 'relative z-10'

  return (
    <div className={cardClassName}> 
      <Link to={`/ad/${ad.slug}`}>
        <Badge.Ribbon 
        text={`${ad?.type} for ${ad?.action}`} 
        color={badgeColor} 
       // style={{ fontFamily: 'floral', fontWeight: 'normal' }}
        className="text-sm md:text-base" 
        >
          <div className="card hoverable shadow-lg shadow-[#879c7d] rounded-md my-card pb-4 w-90 h-100"> {/* Määritellään kortin koko */}
            <img
              src={ad?.photos?.[0]?.Location || 'default-image.jpg'}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              className="w-full h-60 object-cover rounded-t-md" // Määritellään kuvan koko ja sovitus
              />
              <div className="card-body">
              <h3 className="text-2xl pl-2 pt-6 pb-1 ">{formatNumber(ad?.price)}€</h3>
              <p className="text-md text-[#879c7d] pl-2 pb-2">{ad?.address}</p>
              <AdFeatures ad={ad} layout="spread" />
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}

